import { ICommand } from "wokcommands";
import { Interaction, MessageEmbed } from "discord.js";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
import Heroku from 'heroku-client'
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Terminates the bot process",
    aliases: ["exit", "abort", "terminate", "shutdown"],

    slash: false,

    minArgs: 1,
    expectedArgs: "<type>",
    
    permissions: ["ADMINISTRATOR"],
    ownerOnly: true,
    testOnly: true,

    callback: async ({ message, client, text }) => {

        let shutdown: string = ""
        let local: boolean = false
        let server: boolean = false

        if (text == "local") {
            shutdown = "\`\`\`> Shutting down the locally hosted bot...\`\`\`"
            local = true
        } else if (text == "server") {
            shutdown = "\`\`\`> Shutting down the serverside hosted bot...\`\`\`"
            server = true
        } else {
            const embed = new MessageEmbed()
            .setTitle(config.admin_title)
            .setDescription("\`\`\`> Invalid argument! Please try again\`\`\`")
            .setColor(`#${config["color"].error}`)
            return message.channel.send("Invalid argument! Please try again")
        }

        const embed = new MessageEmbed()
            .setTitle(config.admin_title)
            .setDescription("\`\`\`> Shutting down the bot...\`\`\`")
            .setColor(`#${config['color'].admin}`)

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
            } else if (text == "server") {

            } else {
                message.channel.send("Invalid argument! Please try again")
            }
        })
    }
} as ICommand
