import { Interaction, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import LOG from "../../headers/logs.json"
import * as config from "../../config.json"

export default {
    category: "Admin",
    description: "Send a message to a specific channel",

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: false,

    callback: async ({ message, client }) => {
        const adminchannels = new Array("913948455766990888", "913948495537377330", "909224884939419708");
        if (!adminchannels.includes(message.channel.id)) {
            message.delete()
        }

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();

        let generalchannel: TextChannel = client.channels.cache.get(config["channel"].general) as TextChannel;
        let secretchannel: TextChannel = client.channels.cache.get(config["channel"].secret) as TextChannel;

        function ErrorEmbed() {
            const IncorrectEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`> Invalid argument! Please try again.\nCorrect usage: ${config.prefix}announce <general | secret-general> <message>\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [IncorrectEmbed] });
            return;
        }

        if (!args.length || args.length == 1) {
            ErrorEmbed()
        } else {
            let announce_message = args.slice(1).join(" ");
            let SendID = args.shift()?.toLowerCase();
            announce_message.toString();

            let result = announce_message.replace(/@everyone/i, "(@)everyone");
            let ChannelID: string = ""

            if (message.content.length < 2000) {
                switch (SendID) {
                    case "general":
                        ChannelID = "906386495441612800"
                        await generalchannel.send(result);
                        break;
                    case "secret-general":
                    case "secret":
                        ChannelID = "911060120400695316"
                        await secretchannel.send(result);
                        break;
                    default:
                        ErrorEmbed()
                        break;
                }

                const SentEmbed = new MessageEmbed()
                    .setDescription(`**Message sent in <#${ChannelID}>!**`)
                    .setColor(`#${config["color"].default}`);
                message.channel.send({ embeds: [SentEmbed] })
            }
        }
    }
} as ICommand
