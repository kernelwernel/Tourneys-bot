import { Interaction, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()
import * as config from "../../config.json"

export default {
    category: "Utility",
    description: "Suggest a server/bot feature",
    aliases: ["suggestion"],

    slash: false,
    cooldown: "1m",

    ownerOnly: false,
    testOnly: true,

    callback: async ({ message, client, interaction }) => {
        try {
            let suggestionchannel: TextChannel = client.channels.cache.get(config["channel"].suggestions) as TextChannel;
            let cmdchannel: TextChannel = client.channels.cache.get(config["channel"].cmd) as TextChannel;

            const args = message.content.slice(config.prefix.length).trim().split(/ +/);
            const command = args.shift()?.toLowerCase();

            let suggestion: string | undefined = args.join(" ");

            console.log(`${LOG.CLIENT_COMMAND} ${message.author.tag} - ${message.content}`);
            const CommandEmbed = new MessageEmbed()
                .setColor(`#${config["color"].discord}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                .setDescription(`**Command executed:**\`\`\`${message.content}\`\`\``);
            cmdchannel.send({ embeds: [CommandEmbed] });

            if (!args || args[0] == undefined) {
                const ErrorEmbed = new MessageEmbed()
                    .setDescription(`**Please enter a valid suggestion!\nUsage:**\`\`\`;suggest <message>\`\`\``)
                    .setColor(`#${config["color"].error}`);
                message.channel.send({ embeds: [ErrorEmbed] });
                return ;
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

                const SentEmbed = new MessageEmbed()
                    .setDescription(`**Your suggestion has been sent!  <:yes:798918006876799008>**`)
                    .setColor(`#${config["color"].default}`);
                message.channel.send({ embeds: [SentEmbed] })

                const SuggestionEmbed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                    .setDescription(`**${suggestion}**`)
                    .setColor(`#${config["color"].default}`);
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