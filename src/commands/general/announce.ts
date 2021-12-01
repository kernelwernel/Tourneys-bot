import { Interaction, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()
import * as config from "../../config.json"

export default {
    category: "Admin",
    description: "Send a message to a specific channel",

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: false,

    callback: async ({ message, client }) => {
        if (config["list"].blacklisted.includes(message.author.id)) { return; }
        const adminchannels = new Array("913948455766990888", "913948495537377330", "909224884939419708");
        if (!adminchannels.includes(message.channel.id)) {
            message.delete()
        }
        
        const error1: string = `> Invalid argument! Please try again.\nCorrect usage: ${config.prefix}announce <general | secret> <message>`
        const error2: string = `> Invalid channel argument! Make sure the argument is either "general" or "secret"\nExample:\n  ;announce general hello chat;`

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();

        let generalchannel: TextChannel = client.channels.cache.get(config["channel"].general) as TextChannel;
        let secretchannel: TextChannel = client.channels.cache.get(config["channel"].secret) as TextChannel;

        function ErrorEmbed(errorMessage: string) {
            const IncorrectEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${errorMessage}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [IncorrectEmbed] });
            return;
        }

        if (!args.length || args.length == 1) {
            ErrorEmbed(error1)
        } else {
            let announce_message = args.slice(1).join(" ");
            let SendID = args.shift()?.toLowerCase();
            announce_message.toString();

            let result = announce_message.replace(/@everyone/i, "(@)everyone");
            let channelID: string | undefined;
            let validChannel: boolean | undefined;

            if (message.content.length < 2000) {
                switch (SendID) {
                    case "g":
                    case "general":
                        validChannel = true
                        channelID = "906386495441612800"
                        await generalchannel.send(result);
                        break;
                    case "s":
                    case "secret":
                    case "secret-general":
                        validChannel = true
                        channelID = "911060120400695316"
                        await secretchannel.send(result);
                        break;
                    default:
                        validChannel = false
                        break;
                }

                if (validChannel == true) {
                    let cmdchannel: TextChannel = client.channels.cache.get(config["channel"].cmd) as TextChannel;
                    const SentEmbed = new MessageEmbed()
                        .setDescription(`**Message sent in <#${channelID}>!**`)
                        .setColor(`#${config["color"].default}`);
                    message.channel.send({ embeds: [SentEmbed] })
                    const CommandEmbed = new MessageEmbed()
                        .setColor(`#${config["color"].discord}`)
                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                        .setDescription(`**Command executed:**\`\`\`${message.content}\`\`\``);
                    cmdchannel.send({ embeds: [CommandEmbed] });
                } else {
                    ErrorEmbed(error2)
                }
            }
        }

        try { } catch (error) {
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