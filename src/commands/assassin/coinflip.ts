import { Interaction, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()
import * as config from "../../config.json"

export default {
    category: "coinflip",
    description: "Ouputs either heads or tails",
    aliases: ["coin", "flip", "coin-flip", "cf"],

    slash: false,
    cooldown: "3s",

    ownerOnly: false,
    testOnly: true,

    callback: ({ message, client, interaction, text }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }

            let result: string | undefined

            let coinflip = Math.floor(Math.random() * 2)
            switch (coinflip) {
                case 0:
                    result = "Heads"
                    break;
                case 1:
                    result = "Tails"
                    break;
            }

            const CoinflipEmbed = new MessageEmbed()
                .setDescription(`**${result}**`)
                .setColor(`#${config["color"].default}`);
            message.channel.send({ embeds: [CoinflipEmbed] });

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
} as ICommand