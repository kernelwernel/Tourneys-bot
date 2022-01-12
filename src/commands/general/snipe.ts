/*
 * Credit for the snipe code goes to https://github.com/DankMemer/sniper.
 * If you're the owner of the above mentioned repository
 * and you want me to remove the code, please dm me on discord at nonce#0001.
*/

import { Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
import { client } from "../../index"
const LOG = new LOG_TAGS()

const snipes = {};

client.on("messageDelete", async (message) => {
    if (message.partial || (message.embeds.length && !message.content) || message.author.bot) { return; }
    snipes[message.channel.id] = {
        author: message.author,
        content: message.content,
        createdAt: message.createdTimestamp,
        image: message.attachments.first() ? message.attachments.first()?.proxyURL : null,
    };
});

export default {
    category: "General",
    description: "snipe command",

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: async ({ message, channel }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }

            const snipe = snipes[channel.id];
            let bypass: boolean = false

            if (!snipe) {
                const NoSnipeEmbed = new MessageEmbed()
                    .setColor(`#${config["color"].error}`)
                    .setDescription(`**There is nothing to snipe!**`)
                message.channel.send({ embeds: [NoSnipeEmbed]});
                return;
            }

            /*
            * for anybody looking at this, i'm only writting these
            * slurs/derogative words in the context to detect
            * and stop people from bypassing.
            * I'm not writing these for any kind of discriminatorial
            * reason or anything based on my personal/racial or any offensive beliefs whatsoever.
            */

            const antibypass = /nigger|niger|nigga|niga|kys|retard|faggot|fag/
            let bypassMessage = snipe.content
            bypassMessage = snipe.content.replace("1", "i")
            bypassMessage = snipe.content.replace("3", "e")
            bypassMessage = snipe.content.replace("0", "o")
            bypassMessage = snipe.content.replace("4", "a")

            if (bypassMessage.toLowerCase().match(antibypass)) {
                bypass = true
            }

            const SnipeEmbed = new MessageEmbed()
                .setAuthor(`${snipe.author.tag}`, `${snipe.author.displayAvatarURL({dynamic: true})}`)
                bypass ? SnipeEmbed.setColor(`#${config["color"].error}`) : SnipeEmbed.setColor(`#${config["color"].default}`) 
                snipe.content ? SnipeEmbed.setDescription(`\`\`\`${bypassMessage}\`\`\``) : null;
                snipe.image ? SnipeEmbed.setImage(snipe.image) : null;
                bypass ? SnipeEmbed.setDescription(`\`\`\`The sniped message contains a bypassed word.\`\`\``) : null;
                bypass ? SnipeEmbed.setFooter(`blame folder for this he made me add this shit feature that i already removed smh`) : null;
            await message.channel.send({ embeds: [SnipeEmbed] });

            const SnipeEmbed = new MessageEmbed()
            .setAuthor(`${snipe.author.tag}`, `${snipe.author.displayAvatarURL({dynamic: true})}`)
            bypass ? SnipeEmbed.setColor(`#${config["color"].error}`) : SnipeEmbed.setColor(`#${config["color"].default}`) 
            snipe.content ? SnipeEmbed.setDescription(`\`\`\`${snipe.content}\`\`\``) : null;
            snipe.image ? SnipeEmbed.setImage(snipe.image) : null;
            bypass ? SnipeEmbed.setDescription(`\`\`\`The sniped message contains a bypassed word.\`\`\``) : null;
            bypass ? SnipeEmbed.setFooter(`blame dom for this he made me add this shit feature lol`) : null;
            await message.channel.send({ embeds: [SnipeEmbed] });
        } catch (error) {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`)
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
            return;
        };
    }
} as ICommand;
