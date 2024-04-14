const helloWorld = require('./function');

async function main() {
    // // POST request
    // helloWorld.helloWorld(
    //     {
    //         method: 'POST',
    //         body: {
    //             player: 'player1',
    //             levelName: 'level1',
    //             moves: [
    //                 [1, 2],
    //                 [3, 4],
    //             ],
    //         },
    //     },
    //     {
    //         status: (code) => {
    //             console.log(`Status code: ${code}`);
    //             return {
    //                 send: (text) => {
    //                     console.log(`Response: ${text}`);
    //                 },
    //             };
    //         },
    //     }
    // );

    // GET request with level=twoswitches as the query parameter
    helloWorld.helloWorld(
        {
            method: 'GET',
            query: {
                level: 'twoswitches',
            },
        },
        {
            set: (key, value) => {
                console.log(`Set header: ${key}=${value}`);
            },
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
