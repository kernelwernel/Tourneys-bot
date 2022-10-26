import { Interaction, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Send a message to a specific channel",
    aliases: ["say"],

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: false,

    callback: async ({ message, client, args }) => {
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

            const error1: string = `Invalid argument! Please try again.\nCorrect usage:\n${config.prefix}announce <message>`

            if ((args[0] == "g") || args[0] == "general" || args[0] == "s" || args[0] == "secret") {
                const BypassEmbed = new MessageEmbed()
                    .setTitle(config["title"].warn)
                    .setDescription(`**Sending channels to specific channels have been removed. Please use** \`;announce <message>\` **instead. (this will send the message to general by default)**`)
                    .setColor(`#${config["color"].error}`)
                message.channel.send({ embeds: [BypassEmbed] });
                return;
            }

            if (args.length == 0) {
                return ErrorEmbed(error1)
            } else {
                let announce_message = args.join(" ");
                announce_message.toString();

                if (message.content.length < 2000) {
                    /*
                    * for anybody looking at this, i'm only writing these
                    * slurs/derogative words in the context to detect
                    * and stop people from bypassing.
                    * I'm not writing these for any kind of discriminatorial
                    * reason or anything based on my personal/racial or any offensive beliefs whatsoever.
                    */
                    const antibypass = /nigger|niger|nigga|niga|kys|retard|faggot|fag|@everyone|@here|@player|@regular/
                    let bypassMessage: string = message.content
                    let generalchannel: TextChannel = client.channels.cache.get(config["channels"].general) as TextChannel;
                    let cmdchannel: TextChannel = client.channels.cache.get(config["channels"].cmd) as TextChannel;

                    bypassMessage = message.content.replace("1", "i")
                    bypassMessage = message.content.replace("3", "e")
                    bypassMessage = message.content.replace("0", "o")
                    bypassMessage = message.content.replace("4", "a")

                    if (bypassMessage.toLowerCase().match(antibypass)) {
                        const BypassEmbed = new MessageEmbed()
                            .setTitle(config["title"].error)
                            .setDescription(`\`\`\`The inputted message contains a bypassed word or a ping, please replace it or the message will not be announced.\`\`\``)
                            .setColor(`#${config["color"].error}`);
                        message.channel.send({ embeds: [BypassEmbed] });
                        return;
                    }

                    await generalchannel.send(announce_message);

                    const SentEmbed = new MessageEmbed()
                        .setDescription(`**Message sent in <#906386495441612800>!**`)
                        .setColor(`#${config["color"].default}`);
                    message.channel.send({ embeds: [SentEmbed] })
                    
                    const CommandEmbed = new MessageEmbed()
                        .setColor(`#${config["color"].discord}`)
                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                        .setDescription(`**Command executed:**\`\`\`${message.content}\`\`\``);
                    cmdchannel.send({ embeds: [CommandEmbed] });
                    console.log(`${LOG.CLIENT_COMMAND} ${message.author.tag} - ${message.content}`)
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