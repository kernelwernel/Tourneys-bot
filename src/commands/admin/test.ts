import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Just a simple test command to see if the bot works",
    
    slash: false,
    
    permissions: ["MANAGE_GUILD"],
    ownerOnly: true,
    testOnly: true,

    callback: ({ message }) => {
        const embed = new MessageEmbed()
        .setDescription("<:trollgod:855435721624256542>")
        .setColor(`#${config.color}`)
    return embed
    }
} as ICommand