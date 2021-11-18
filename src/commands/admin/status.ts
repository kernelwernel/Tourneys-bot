import { MessageEmbed } from "discord.js";
import { text } from "stream/consumers";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Configuration",
    description: "Sets the bots status",

    slash: false,

    minArgs: 1,
    expectedArgs: "<status>",

    permissions: ["MANAGE_GUILD"],
    ownerOnly: true,
    testOnly: true,

    callback: ({ client, message, text }) => {
        const embed = new MessageEmbed()
            .setDescription(`Status has been updated to ${text}`)
            .setColor(`#${config.color}`)
            client.user?.setPresence({
                status: "dnd",
                activities: [
                    {
                        name: text
                    }
                ]
            })
        message.channel.send({
            embeds: [embed]
        })
    }
} as ICommand