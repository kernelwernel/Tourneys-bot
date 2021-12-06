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

const reactionSnipes = {};

client.on("messageReactionRemove", async (reaction, user) => {
	if (reaction.partial) reaction = await reaction.fetch();

	reactionSnipes[reaction.message.channel.id] = {
		user: user,
		emoji: reaction.emoji,
		messageURL: reaction.message.url,
		createdAt: Date.now(),
	};
});

const formatEmoji = (emoji: { id: any; available: any; toString: () => any; name: any; url: any; }) => {
	return !emoji.id || emoji.available
		? emoji.toString()
		: `[:${emoji.name}:](${emoji.url})`;
};

export default {
    category: "General",
    description: "snipes a reaction",
    aliases: ["react", "reactsnipe"],

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: async ({ message, channel }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }

            const snipe = reactionSnipes[channel.id];

            await message.channel.send(
                snipe ? {
                    embeds: [
                        new MessageEmbed()
                            .setColor(`#${config["color"].default}`)
                            .setAuthor(`${snipe.author.tag}`, `${snipe.author.displayAvatarURL({dynamic: true})}`)
                            .setDescription(
                                `reacted with ${formatEmoji(
                                    snipe.emoji
                                )} on [this message](${snipe.messageURL})`
                            )
                        ],
                } : { embeds: [
                    new MessageEmbed()
                        .setColor(`#${config["color"].error}`)
                        .setDescription(`**There is nothing to snipe!**`)
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
