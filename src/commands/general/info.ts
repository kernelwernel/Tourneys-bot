import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"

export default {
    category: "General",
    description: "Replies with the bot's info",
    
    slash: "both",

    ownerOnly: false,
    testOnly: false,

    callback: ({ message, client, interaction, text }) => {
        const embed = new MessageEmbed()
            .setDescription(``)
            .setColor(`#${config.color}`)
        return embed
    }
} as ICommand

