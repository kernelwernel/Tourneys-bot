import { Interaction, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()
import * as config from "../../config.json"

export default {
    category: "Admin",
    description: "Send a message to a specific channel",
    aliases: ["say"],

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: false,

    callback: async ({ message, client }) => {
        function ErrorEmbed(errorMessage: string) {
            const IncorrectEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${errorMessage}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [IncorrectEmbed] });
            return;
        }

        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
            const adminchannels = new Array("913948455766990888", "913948495537377330", "909224884939419708");
            let adminExecute: boolean | undefined

            if (!adminchannels.includes(message.channel.id)) {
                message.delete()
                adminExecute = true
            } else {
                adminExecute == false
            }
            
            const error1: string = `> Invalid argument! Please try again.\nCorrect usage:\n${config.prefix}announce <general | secret> <message>`
            const error2: string = `> Invalid channel argument! Make sure the argument is either "general" or "secret"\nExample:\n  ;announce general hello chat`

            const args = message.content.slice(config.prefix.length).trim().split(/ +/);
            const command = args.shift()?.toLowerCase();

            let bypassMessage: string
            let generalchannel: TextChannel = client.channels.cache.get(config["channel"].general) as TextChannel;
            let secretchannel: TextChannel = client.channels.cache.get(config["channel"].secret) as TextChannel;

            if (!args.length || args.length == 1) {
                return ErrorEmbed(error1)
            } else {
                let announce_message = args.slice(1).join(" ");
                let SendID = args.shift()?.toLowerCase();
                announce_message.toString();

                if (message.content.length < 2000) {
                    /*
                    * for anybody looking at this, i'm only writting these
                    * slurs/derogative words in the context to detect
                    * and stop people from bypassing these.
                    * I'm not writing these for any kind of discriminatorial
                    * reason or anything based on my racial beliefs.
                    */
                    const antibypass = /nigger|niger|nigga|niga|kys|retard|faggot|fag/
                    bypassMessage = message.content
                    bypassMessage = message.content.replace("1", "i")
                    bypassMessage = message.content.replace("3", "e")
                    bypassMessage = message.content.replace("0", "o")
                    bypassMessage = message.content.replace("4", "a")

                    if (bypassMessage.toLowerCase().match(antibypass)) {
                        const BypassEmbed = new MessageEmbed()
                            .setTitle(config["title"].error)
                            .setDescription(`\`\`\`> The inputted message contains a bypassed word, please replace it or the message will not be announced.\`\`\``)
                            .setColor(`#${config["color"].error}`);
                        message.channel.send({ embeds: [BypassEmbed] });
                        return;
                    }

                    let result = announce_message.replace(/@/i, "(@)");
                    let channelID: string | undefined;
                    let validChannel: boolean | undefined;
                    let noLog: boolean;

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

                    message.channel.id == "911060120400695316" 
                        ? noLog = true 
                        : noLog = false

                    if (validChannel == true) {
                        if (noLog == true) {
                            if (adminExecute == false) {
                                message.delete();
                                return;
                            }
                        } else if (noLog == false) {
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
                            console.log(`${LOG.CLIENT_COMMAND} ${message.author.tag} - ${message.content}`)
                        } else {
                            return ErrorEmbed(error1)
                        }
                    } else {
                        return ErrorEmbed(error2)
                    }
                }
            }

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