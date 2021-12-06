/*
 * Credit for the snipe code goes to https://github.com/DankMemer/sniper.
 * If you're the owner of the above mentioned repository 
 * and you want me to remove the code, please dm me on discord at nonce#7444.
*/

import { Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
import { client } from "../../index"
const LOG = new LOG_TAGS()

const snipes = {};
const editSnipes = {};
const reactionSnipes = {};

client.on("messageDelete", async (message) => {
    if (message.partial || (message.embeds.length && !message.content)) { return; }
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

            if (!snipe) {
                const NoSnipeEmbed = new MessageEmbed()
                    .setColor(`#${config["color"].default}`)
                    .setDescription(`**There is nothing to snipe!**`)
                message.channel.send({ embeds: [NoSnipeEmbed]});
                return;
            }

            const SnipeEmbed = new MessageEmbed()
                .setAuthor(`${snipe.author.tag}`, `${snipe.author.displayAvatarURL({dynamic: true})}`)
                .setFooter(`#${channel.name}`)
                .setColor(`#${config["color"].default}`)
                .setTimestamp(snipe.createdAt);
                snipe.content ? SnipeEmbed.setDescription(snipe.content) : null;
                snipe.image ? SnipeEmbed.setImage(snipe.image) : null;
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
