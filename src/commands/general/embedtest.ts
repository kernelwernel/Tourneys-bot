import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import LOG_TAGS from "../../logs"
const LOG = new LOG_TAGS()
import * as config from "../../config.json"

export default {
    category: "",
    description: "",
    aliases: [""],

    slash: "both",

    permissions: ["ADMINISTRATOR"],
    ownerOnly: false,
    testOnly: false,

    callback: ({ message, client, interaction, text }) => {
        
    }
} as ICommand
