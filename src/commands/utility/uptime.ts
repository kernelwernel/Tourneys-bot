import { MessageEmbed, Client } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import * as npm from "../../../package.json"
import axios from "axios"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Utility",
    description: "Displays the bot's information",
    aliases: ["botinfo", "bot"],
    
    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: async ({ client, message }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
            let totalSeconds = (client.uptime! / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);

            const embed = new MessageEmbed()
                .setColor(`#${config["color"].default}`)
                .setDescription(`__**⏲ Bot uptime: **__ - **${days} days, ${hours} hours, ${minutes} minutes**`)
            message.channel.send({ embeds: [embed] })

        } catch (error) {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
            return;
        }
    }
}