const { error } = require("../utils/error.js");
const fs = require("node:fs");
/**
 * @ Extends config
 */

class Settings extends config {
    constructor(options) {
        if (typeof options.path !== "string") return error({
            title: "String Error",
            error: "The path variable is a string"
        })

        if (!options.path) return error({
            title: "Missing Path",
            code: "missargs"
        })

        if (typeof options.loaderType !== "string") return error({
            title: "String Error",
            error: "The load variable is a string"
        })

        if (!["run", "execute"].includes(options.loaderType)) return error({
            title: "Try: execute",
            code: "loaderr"
        })

        if (typeof options.Client !== "object") return error({
            title: "Client Error",
            code: "login",
            error: "Please provide the client given by discord.js"
        })

        if (!options.Client.ws) return error({
            title: "Client Error",
            code: "login",
            error: "The client websocket provided is invalid."
        })

        this.path = options.path;
        this.loaderType = options.loaderType;
        this.client = options.Client;
        this.debug = options.debug;
    }

    async setCollection({ prefix: p, slash: s }) {
        let path = this.path;

        for (const folder of fs.readdirSync(`${path}`)) {
            for (const file of fs.readdirSync(`${path}/${folder}`)) {
                const command = require.main.require(`${path}/${folder}/${file}`)
                const commands = await this.client.application.commands.fetch()
                    .catch(() => null)
                p.set(command.name, command);
                s.set(command.name, command);
                if (!command.find((x) => x.name === command.name)) {
                    this.client.application.commands.create(command.slash)
                }
                this.debug === true ? console.log(`[MultiCommand] ${command.name} was loaded without problems`) : null
            }
        }
    }

    async deleteCommand(name) {
        try {
            await this.client.application.commands.fetch()
            let x = this.client.application.commands.cache.find((x) => x.name === name)
            return x.delete()
        }catch(e) {
            error({
                title: e.name, 
                code: "slashediterr",
                error: (e?.stack || e)
            })
        }
    }
}

module.exports = Settings;