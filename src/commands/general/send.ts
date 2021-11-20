import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Replies with pong",
    
    slash: "both",
    cooldown: "4s",
    
    ownerOnly: false,
    testOnly: false,

    callback: ({ message, client }) => {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();

        if (!args.length) {
            const IncorrectEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription("\`\`\`> Invalid argument! Please try again.\nCorrect usage: ;send <id> <message>\`\`\`")
                .setColor(`#${config["color"].error}`)
            message.channel.send({ embeds: [IncorrectEmbed] })
            return
        } else {
            console.log(`${LOG.CLIENT_COMMAND} ${message.author.tag} - ${message.content}`)

            let DMmessage = args.slice(1).join(" ")
            let SendID = args.shift()
            DMmessage.toString()

            client.users.fetch(`${SendID}`).then((user) => {
                user.send(`${DMmessage}`)
                const SentEmbed = new MessageEmbed()
                    .setDescription(`**Message to <@${SendID}> sent!**`)
                    .setColor(`#${config["color"].default}`)
                message.channel.send({ embeds: [SentEmbed] })
            }).catch((error) => {
                const ErrorEmbed = new MessageEmbed()
                    .setTitle(config["title"].error)
                    .setDescription(`\`\`\`${error}\`\`\``)
                    .setColor(`#${config["color"].error}`)
                message.channel.send({ embeds: [ErrorEmbed] });
                console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
                return;
            });
        }
    }
} as ICommand