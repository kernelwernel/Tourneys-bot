import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Clears the terminal, used for clearing all the logs",
    aliases: ["console-clear"],

    slash: false,

    permissions: ["MANAGE_GUILD"],
    ownerOnly: true,
    testOnly: true,

    callback: ({ }) => {
        const embed = new MessageEmbed()
            .setColor(`#${config.admin_color}`)
            .setTitle(config.admin_title)
            .setDescription(`\`\`\`> Console has been cleared\n\`\`\``)
            console.clear()
        return embed
    }
} as ICommand