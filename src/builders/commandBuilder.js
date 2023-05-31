const { slashType } = require("../core");

class builder {
    constructor() {
        this.data = {
            name: undefined,
            aliases: undefined,
            type: undefined,
            options: undefined,
            description: undefined
        }
    }

    setName(name) {
        if (typeof name !== "string") throw new Error(`[MultiCommands => hybridBuilder] Expected command name to be a string, received ${typeof name}!`)
        this.data.name = name
        return this
    }

    setAliases(a) {
        this.data.aliases = a || []
        return this;
    }

    setType(type) {
        if (typeof type === "number") {
            if (type > 11) throw new Error(`[MultiCommands => hybridBuilder] The type provided is not valid.\n${slashType.stringGet}`)
            this.data.type = type
        } else {
            if (!slashType.stringGet[type]) throw new Error(`[MultiCommands => hybridBuilder] The type provided is not valid.\n${slashType.stringGet}`)
            this.data.type = type
        }
        return this
    }

    setOptions(options) {
        if (typeof options !== "object") throw new Error(`[MultiCommands => hybridBuilder] Options not valid.`)
        this.data.options = options
        return this
    }

    setDescription(description) {
        if (typeof description !== "string") throw new Error(`[MultiCommands => hybridBuilder] Expected command description to be a string, received ${typeof description}!`)
        this.data.description = description
        return this
    }

    async start() {
        let data = this.data
        if (!data.name) throw new Error(`[MultiCommands => hybridBuilder] Command name not provided.`)
        if (!data.description) throw new Error(`[MultiCommands => hybridBuilder] Command description not provided.`)
        return {
            name: data.name,
            description: data.description,
            aliases: data.aliases,
            slash: {
                name: data.name,
                description: data.description
            }
        }
    }
}

module.exports = builder