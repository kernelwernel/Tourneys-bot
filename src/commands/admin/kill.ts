import { ICommand } from "wokcommands";
import { Interaction, MessageEmbed } from "discord.js";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Terminates the bot process",
    aliases: ["exit", "abort", "terminate", "shutdown"],

    slash: false,

    minArgs: 1,
    expectedArgs: "<location>",
    
    permissions: ["ADMINISTRATOR"],
    ownerOnly: true,
    testOnly: true,

    callback: async ({ message, client, text }) => {

        const embed = new MessageEmbed()
            .setTitle(config.admin_title)
            .setDescription("\`\`\`> Shutting down the bot...\`\`\`")
            .setColor(`#${config.admin_color}`)

        const newMessage = await message.reply({
            embeds: [embed]
        })

        const newEmbed = newMessage.embeds[0]
        newEmbed.setDescription("\`\`\`> Shutting down the bot...\n> Bot has been shut down\`\`\`")
        newMessage.edit({
            embeds: [newEmbed]
        }).then(async () => {
            console.log(`${LOG.SYSTEM_SHUTDOWN} by ${message.author.tag}`)
            client.user?.setStatus('invisible')

            if (text == "local") {
                process.exit(1)
            } else if (text == "heroku") {
                console.log("heroku run heroku ps:scale worker=0")
            } else {
                message.channel.send("Invalid argument! Please try again")
            }
        })
    }
} as ICommand
