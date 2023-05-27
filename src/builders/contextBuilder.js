class contextBuilder {
    constructor (data, args, ...params) {
        this.data = data;
        this.params = params;
        this.args = args;
        this.client = data.client
        this.type;
        if (!data.content) {
            this.type = "slash";
            this.author = data.user
        } else {
            this.type = "prefix"
            this.author = data.author
        }
    }

    async send({ content: conten, ephemeral: eph, components: c, embeds: emb, reply: r, fetchReply: f }) {
        if (this.type === "slash") {
            return this.data.reply({
                content: conten,
                ephemeral: eph || false,
                components: c || [],
                embeds: emb || [],
                fetchReply: f || false
            }).catch((e) => {
                throw new Error(`[MultiCommands => DiscordJS Error] ${e}`)
            })
        } else {
            if (r === true) {
             return  this.data.reply({
                    content: conten,
                    embeds: emb || [],
                    components: c || []
                }).catch((e) => {
                    throw new Error(`[MultiCommands => DiscordJS Error] ${e}`)
                })
            } else {
             return  this.data.channel.send({
                    content: conten,
                    embeds: emb || [],
                    components: c || []
                }).catch((e) => {
                    throw new Error(`[MultiCommands => DiscordJS Error] ${e}`)
                })
            }
        }
    }
}

module.exports = contextBuilder