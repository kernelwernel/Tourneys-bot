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

const editSnipes = {};

client.on("messageUpdate", async (oldMessage, newMessage) => {
	if (oldMessage.partial) { return; } 

	editSnipes[oldMessage.channel.id] = {
		author: oldMessage.author,
		oldcontent: oldMessage.content,
        newcontent: newMessage.content,
		createdAt: newMessage.editedTimestamp,
	};
});

export default {
    category: "General",
    description: "snipes an edit",

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: async ({ message, channel }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }

            const snipe = editSnipes[channel.id];

            await message.channel.send(
                snipe ? {
                    embeds: [
                        new MessageEmbed()
                            .setColor(`#${config["color"].default}`)
                            .setDescription(`Old message: \`\`\`${snipe.oldcontent}\`\`\`\nEdited message: \`\`\`${snipe.newcontent}\`\`\``)
                            .setAuthor(`${snipe.author.tag}`, `${snipe.author.displayAvatarURL({dynamic: true})}`)
                    ]
                } : { 
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`**There is nothing to snipe!**`)
                            .setColor(`#${config["color"].error}`)
                    ]  
                }
            );
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
