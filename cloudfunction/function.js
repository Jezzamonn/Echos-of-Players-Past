const mysql = require('mysql2/promise');
const {Connector} = require('@google-cloud/cloud-sql-connector');

// In case the PRIVATE_IP environment variable is defined then we set
// the ipType=PRIVATE for the new connector instance, otherwise defaults
// to public ip type.
const getIpType = () =>
  process.env.PRIVATE_IP === '1' || process.env.PRIVATE_IP === 'true'
    ? 'PRIVATE'
    : 'PUBLIC';

// connectWithConnector initializes a connection pool for a Cloud SQL instance
// of MySQL using the Cloud SQL Node.js Connector.
async function connectWithConnector(config) {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  const connector = new Connector();
  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
    ipType: getIpType(),
  });
  const dbConfig = {
    ...clientOpts,
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    // ... Specify additional properties here.
    ...config,
  };
  // Establish a connection to the database.
  return mysql.createPool(dbConfig);
};

const poolPromise = connectWithConnector();

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
async function helloWorld(req, res) {
    if (req.method === 'POST') {
        // Extract data from request
        const data = req.body;
        const playerName = data.player;
        const levelName = data.level;
        const moves = data.moves;

        if (typeof playerName !== 'string') {
            res.status(400).send('playerName must be a string');
            return;
        }
        if (typeof levelName !== 'string') {
            res.status(400).send('levelName must be a string');
            return;
        }
        if (!Array.isArray(moves)) {
            res.status(400).send('moves must be an array');
            return;
        }
        for (const move of moves) {
            if (!Array.isArray(move)) {
                res.status(400).send('Each move must be an array');
                return;
            }
            if (move.length !== 2) {
                res.status(400).send('Each move must have exactly 2 elements');
                return;
            }
            if (typeof move[0] !== 'number') {
                res.status(400).send('The first element of each move must be a number');
                return;
            }
            if (typeof move[1] !== 'number') {
                res.status(400).send('The second element of each move must be a number');
                return;
            }
        }

        // Insert data into database
        try {
            await insertMovement(playerName, levelName, moves);
            res.status(200).send('Data inserted successfully!');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error inserting data');
        }
    } else if (req.method === 'GET') {
        // Extract data from request
        const maxMovements = 20;
        const levelName = req.query.levelName || 'level1';

        // Read data from database
        try {
            const movements = await readMovements(maxMovements, levelName);
            res.status(200).send(movements);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error reading data');
        }
    } else {
        res.status(405).send('Method not allowed');
    }
};

/**
 * @param {string} playerName
 * @param {string} levelName
 * @param {[number, number][]} moves
 */
async function insertMovement(playerName, levelName, moves) {
    const connection = await (await poolPromise).getConnection();
    try {
        // Insert new movement
        const movementSql = `INSERT INTO Movements (PlayerName, LevelName) VALUES (?, ?)`;
        const [result] = await connection.query(movementSql, [
            playerName,
            levelName,
        ]);
        const movementId = result.insertId;

        // Prepare move values
        const moveValues = moves.map((move) => [
            movementId,
            move[0],
            move[1],
        ]);

        // Insert multiple moves at once
        const moveSql = `INSERT INTO Moves (MovementId, Frame, KeysPressed) VALUES ?`;
        await connection.query(moveSql, [moveValues]);

        console.log(`${moves.length} moves inserted successfully!`);
    } catch (error) {
        console.error(error);
        throw error; // Re-throw for Cloud Function handling
    } finally {
        connection.release();
    }
}

/**
 * Return movements for a given level.
 *
 * Returns entries in the form of {player: string, moves: [number, number][]}[].
 */
async function readMovements(maxMovements, levelName) {
    const connection = await (await poolPromise).getConnection();
    try {
        const sql = `SELECT Moves.MovementId, PlayerName, Frame, KeysPressed
                 FROM Movements
                 JOIN Moves ON Movements.MovementId = Moves.MovementId
                 WHERE LevelName = ?
                 ORDER BY Time DESC, Frame ASC
                 LIMIT ?`;
        const [results] = await connection.query(sql, [
            levelName,
            maxMovements,
        ]);
        console.log(results)

        const movements = [];
        let movement = undefined;
        let lastMovementId = undefined;
        for (const row of results) {
            if (row.MovementId !== lastMovementId) {
                if (movement != undefined) {
                    movements.push(movement);
                }
                movement = { player: row.PlayerName, moves: [] };
                lastMovementId = row.MovementId;
            }
            movement.moves.push([row.Frame, row.KeysPressed]);
        }

        return movements;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw for Cloud Function handling
    } finally {
        connection.release();
    }
}

exports.helloWorld = helloWorld;
// exports.insertMovement = insertMovement;
// exports.readMovements = readMovements;