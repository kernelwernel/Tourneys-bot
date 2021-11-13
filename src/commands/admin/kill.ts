import { ICommand } from "wokcommands";
import { Interaction, MessageEmbed } from "discord.js";
import * as config from "../../config.json"

export default {
    category: "Admin",
    description: "Terminates the bot process",
    aliases: ["exit", "abort", "terminate"],

    slash: false,
    
    permissions: ["ADMINISTRATOR"],
    ownerOnly: true,
    testOnly: true,

    callback: ({ message, client }) => {
        message.channel.send("Shutting down the bot...")
        client.user?.setStatus('invisible')
        process.exit(1)
    }
} as ICommand
