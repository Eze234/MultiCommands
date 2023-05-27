class getContext {
    constructor(tipo, args, ...params) {
        this.tipo = tipo;
        this.args = args;
    }

    async context() {
        let ctx = {  }
        if (this.tipo.m === "prefix") ctx.message = this.tipo;
        if (this.tipo.m === "slash") ctx.interaction = this.tipo;
        return ctx
    }

    async send({ content: conten, ephemeral: eph, reply: r, embeds: e, components: c, fetchRepy: f}) {
        let ctx = await this.context()
        ctx._v = this.tipo
        if (ctx._v?.m === "slash") {
           return ctx._v.reply({
                content: conten,
                ephemeral: eph || false,
                fetchReply: f || false,
                embeds: e || [],
                components: c || []
            }).catch((e) => {
                console.log(`[MultiCommands] ${e}`)
            })
        }
        if (ctx._v === "prefix") {
            if (r === true) {
               return ctx._v.reply({
                content: conten,
                embeds: e || [],
                components: c || []
                }).catch((e) => {
                    console.log(`[MultiCommands] ${e}`)
                })
            }
            if (r === true) {
               return ctx._v.channel.send({
                    content: conten,
                    embeds: e || [],
                    components: c || []
                    }).catch((e) => {
                        console.log(`[MultiCommands] ${e}`)
                    })
            }
        }
    }

    async author () {
        let ctx = await this.context()
        ctx._v = this.tipo
        if (ctx._v?.m === "slash") {
            return ctx._v.user
        }
        if (ctx._v?.m === "prefix") {
            return ctx._v?.author;
        }
    }
}

module.exports = class testGetContext {
    constructor(data, client){
        if (data instanceof ChatInputCommandInteraction) {
            this.interaction = data
            this.type = "slash"
        } else {
            this.type = "message"
        }
        this.author = this.type === "message" ? data.author : data.user
    }
}

module.exports = getContext