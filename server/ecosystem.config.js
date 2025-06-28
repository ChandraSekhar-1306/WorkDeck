module.exports = {
    apps: [
        {
            name: "WorkDeck",
            script:"npx",
            args: "ts-node src/index.ts",
            env:{
                NODE_ENV: "development",
            },

        }
    ]
}

//needs changing
