# Introduction
**Multi-Commands is an npm which allows you to have hybrid commands without the need of external frameworks to discord.js.**
# Beta
**multi-command is currently undergoing testing and bug fixes.**
# Example
**`index.js`**
```js
const Discord = require("discord.js") // npm i discord.js || yarn add discord.js
const MultiCommands = require("multi-commands-beta");
const client = new Discord.Client({
    intent: [
        // Your intents
    ]
})

client.on("ready", async(client) => {
    console.log("Hello World!")
    
const commands = new MultiCommands.Settings({
    Client: client, // Discord client
    path: "./commands", // String,
    debug: false // Boolean
})

client.commands = new Discord.Collection()


commands.setCollection(client.commands);
})

client.on("messageCreate", async(message) => {
    let prefix = "!";
    if (message.channel.type === Discord.ChannelType.DM) return;
    if (!message.content.toLowerCase() === prefix) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = message.client.commands.find((d) => d.aliases.includes(args.shift().toLowerCase()))
        || message.client.comandos.get(args.shift().toLowerCase());
        if (!command) return;
        const ctx = new MultiCommands.context

        command.run(ctx)

})

client.on("interactionCreate", async(i) => {
    if (i.isCommand()) {
        const command = i.client.commands.get(i.commandName);
        const ctx = new MultiCommands.context(i)
        if (command) command.run(ctx)
    }
})

```

**`ping.js`**
```js
module.exports = {
    name: "ping",
    aliases: ["pong"],
    slash: {
        name: "ping",
        description: "pong"
    },
    run: async(ctx) => {
        ctx.send({
            content: "Pong!", // String -> optional with embed
            ephemeral: true, // Boolean -> optional,
            reply: true, // Boolean -> optional,
            embeds: [], // Array -> optional with content,
            components: [] // Array -> optional with content
        })
    }
}