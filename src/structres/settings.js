
const fs = require("node:fs");
/**
 * @ Extends config
 */

class Settings {
    constructor(options) {
        this.path = options.path;
        this.loaderType = options.loaderType;
        this.client = options.Client;
        this.debug = options.debug;
        this.forceGet = options
    }

    async setCollection({ prefix: p, slash: s }) {
        let path = this.path || this.forceGet.path

        for (const folder of fs.readdirSync(`${path}`)) {
            for (const file of fs.readdirSync(`${path}/${folder}`)) {
                const command = require.main.require(`${path}/${folder}/${file}`)
                const commands = await this.client.application.commands.fetch()
                    .catch(() => null)
                p.set(command.name, command);
                s.set(command.name, command);
                if (!commands.find((x) => x.name === command.name)) {
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
            console.log(`[MultiCommands] ${e}`)
        }
    }
}

module.exports = Settings;