const helloWorld = require('./function');

async function main() {
    // POST request
    helloWorld.helloWorld(
        {
            method: 'POST',
            body: {
                player: 'player1',
                level: 'level1',
                moves: [
                    [1, 2],
                    [3, 4],
                ],
            },
        },
        {
            status: (code) => {
                console.log(`Status code: ${code}`);
                return {
                    send: (text) => {
                        console.log(`Response: ${text}`);
                    },
                };
            },
        }
    );
}

main();
