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
    cooldown: '30m',

    permissions: ["MANAGE_GUILD"],
    ownerOnly: true,
    testOnly: true,

    callback: async ({ client, message }) => {
        const embed = new MessageEmbed()
            .setColor(`#${config["color"].admin}`)
            .setTitle(config.admin_title)
            .setDescription(`\`\`\`> Clearing console...\`\`\``)
            console.clear()
        
        const newMessage = await message.reply({
            embeds: [embed]
        })

        const newEmbed = newMessage.embeds[0]
        newEmbed.setDescription("\`\`\`> Clearing console...\n> Console has been cleared\`\`\`")
        newMessage.edit({
            embeds: [newEmbed]
        })
    }
} as ICommand