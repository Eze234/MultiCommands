const { error } = require("./error,js");
/**
 * @ Extends ctx
 */

class context{
    cotructor(type, args) {
        if (!type) return error({
            title: "Missing type: ctx"
        })
        this.tp = type;
        this.args = args
    }


    async send({ content: c, embeds: e, components: _c, fetchReply: f, ephemeral: e, reply: r }) {
        let ctx = this.tp;
        if (ctx.m == "slash") {
            ctx.reply({
                content: c,
                embeds: e || [],
                components: _c || [],
                fetchReply: f || false,
                ephemeral: e || false
            }).catch((e) => {
                error({
                    title: e.name || "Discord.js Error",
                    error: (e?.stack || e)
                })
            })
        }
        if (ctx.m == "prefix") {
            if (r ===  true) {
                return ctx.reply({
                    content: c,
                    embeds: e || [],
                    components: _c || []
                }).catch((e) => {
                    error({
                        title: e.name || "Discord.js Error",
                        error: (e?.stack || e)
                    })
                })
            } else {
               return ctx.channel.send({
                    content: c,
                    embeds: e || [],
                    components: _c || []
                }).catch((e) => {
                    error({
                        title: e.name || "Discord.js Error",
                        error: (e?.stack || e)
                    })
                })
            }
        }
    }

    author() {
        let ctx = this.tp;
        let author;
        if (ctx.m === "slash") author = ctx.user;
        if (ctx.m === "prefix") author = ctx.author;
        return author;
    }
}

module.exports = context