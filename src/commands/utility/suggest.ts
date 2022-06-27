import { Interaction, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Utility",
    description: "Suggest a server/bot feature",
    aliases: ["suggestion"],

    slash: false,
    cooldown: "6h",

    ownerOnly: false,
    testOnly: true,

    callback: async ({ message, client, interaction, args }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
 
            let suggestionchannel: TextChannel = client.channels.cache.get(config["channels"].suggestions) as TextChannel;
            let cmdchannel: TextChannel = client.channels.cache.get(config["channels"].cmd) as TextChannel;
            let suggestion: string | undefined = args.join(" ");

            console.log(`${LOG.CLIENT_COMMAND} ${message.author.tag} - ${message.content}`);

            var attachment = message.attachments.first();
            var url = attachment ? attachment.url : null;

            const CommandEmbed = new MessageEmbed()
                .setColor(`#${config["color"].discord}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                .setDescription(`**Command executed:**\`\`\`${message.content}\`\`\``)
            cmdchannel.send({ embeds: [CommandEmbed] });

            if ((!args || args[0] == undefined) && url == null) {
                const ErrorEmbed = new MessageEmbed()
                    .setDescription(`**Please enter a valid suggestion!\nUsage:**\`\`\`;suggest <message>\`\`\``)
                    .setColor(`#${config["color"].error}`);
                message.channel.send({ embeds: [ErrorEmbed] });
                return;
            } else {
                var text = true
                if (!args || args[0] == undefined) {
                    text = false
                } else {
                    /*
                    * for anybody looking at this, i'm only writting these
                    * slurs/derogative words in the context to detect
                    * and stop people from bypassing.
                    * I'm not writing these for any kind of discriminatorial
                    * reason or anything based on my personal/racial or any offensive beliefs whatsoever.
                    */
                    const antibypass = /nigger|niger|nigga|niga|kys|retard|faggot|fag/
                    let bypassMessage = message.content
                    bypassMessage = message.content.replace("1", "i")
                    bypassMessage = message.content.replace("3", "e")
                    bypassMessage = message.content.replace("0", "o")
                    bypassMessage = message.content.replace("4", "a")

                    if (bypassMessage.toLowerCase().match(antibypass)) {
                        const BypassEmbed = new MessageEmbed()
                            .setTitle(config["title"].error)
                            .setDescription(`\`\`\`The message contains a bypassed word, please replace it or the message will not be suggested.\`\`\``)
                            .setColor(`#${config["color"].error}`);
                        message.channel.send({ embeds: [BypassEmbed] });
                        return;
                    }
                }

                const SentEmbed = new MessageEmbed()
                    .setDescription(`**Your suggestion has been sent!  <:yes:798918006876799008>**`)
                    .setColor(`#${config["color"].default}`)
                message.channel.send({ embeds: [SentEmbed] })

                const SuggestionEmbed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                    .setColor(`#${config["color"].default}`)
                    text ? SuggestionEmbed.setDescription(`**${suggestion}**`) : null;
                    attachment ? SuggestionEmbed.setImage(`${url}`) : null;
                await suggestionchannel.send({ embeds: [SuggestionEmbed] }).then((message) => {
                    message.react("<:yes:798918006876799008>")
                    message.react("<:no:798917986966437908>")
                })
                return;
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
