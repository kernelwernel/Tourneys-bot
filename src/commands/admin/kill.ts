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

        if (!text) {
            const embed = new MessageEmbed()
            .setTitle(config["title"].admin)
            .setDescription(`\`\`\`> Please enter a valid argument. Usage:\n ;kill <local | server>\`\`\``)
            .setColor(`#${config["color"].error}`)
            message.channel.send({ embeds: [embed] })
        } if (text == "local") {
            shutdown = "Shutting down the locally hosted bot..."
            local = true
        } else if (text == ("server" || "serverside")) {
            shutdown = "Shutting down the serverside hosted bot..."
            server = true
        } else {
            const embed = new MessageEmbed()
            .setTitle(config["title"].admin)
            .setDescription("\`\`\`> Invalid argument! Please try again\`\`\`")
            .setColor(`#${config["color"].error}`)
            message.channel.send({ embeds: [embed] })
            return
        }

        const embed = new MessageEmbed()
            .setTitle(config["title"].admin)
            .setDescription(`\`\`\`${shutdown}\`\`\``)
            .setColor(`#${config['color'].admin}`)

        const newMessage = await message.reply({
            embeds: [embed]
        })

        const newEmbed = newMessage.embeds[0]
        newEmbed.setDescription(`\`\`\`> ${shutdown}\n> Bot has been shut down\`\`\``)
        newMessage.edit({
            embeds: [newEmbed]
        }).then(async () => {
            console.log(`${LOG.SYSTEM_SHUTDOWN} by ${message.author.tag}`)
            client.user?.setStatus('invisible')
        }).catch((error) =>{
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`)
            message.channel.send({ embeds: [ErrorEmbed] })
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
        });
    }
} as ICommand
