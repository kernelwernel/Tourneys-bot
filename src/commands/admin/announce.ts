import { Interaction, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import LOG from "../../headers/logs.json"
import * as config from "../../config.json"

export default {
    category: "Admin",
    description: "Send a message to a specific channel",

    slash: false,

    permissions: ["MANAGE_GUILD"],
    ownerOnly: true,
    testOnly: false,

    callback: async ({ message, client }) => {
        message.delete();
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

            if (message.content.length < 2000) {
                switch (SendID) {
                    case ("general"):
                        await generalchannel.send(announce_message);
                        break;
                    case ("secret"):
                        await secretchannel.send(announce_message);
                        break;
                    default:
                        ErrorEmbed()
                        break;
                }
            }
        }
    }
} as ICommand
