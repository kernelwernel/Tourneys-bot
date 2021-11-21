import { Interaction, Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()
import * as config from "../../config.json"

export default {
    category: "Admin",
    description: "Send a message to a specific channel",
    aliases: [""],

    slash: false,

    permissions: ["MANAGE_GUILD"],
    ownerOnly: true,
    testOnly: false,

    callback: ({ message, client, interaction, text }) => {
        
    }
} as ICommand
