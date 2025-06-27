module.exports = {
    apps: [
        {
            name: "WorkDeck",
            script:"npm",
            args: "run dev",
            env:{
                NODE_ENV: "development",
            },

        }
    ]
}