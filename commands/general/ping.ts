import { Interaction } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: "Testing",
    description: "Replies with pong",

    slash: "both",
    testOnly: false,

    callback: ({ message, client }) => {
        return message.channel.send(`🏓 **Pong!** - ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
    }
} as ICommand