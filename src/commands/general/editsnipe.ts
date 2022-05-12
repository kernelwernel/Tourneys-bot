/*
 * Credit for the snipe code goes to https://github.com/DankMemer/sniper.
 * If you're the owner of the above mentioned repository
 * and you want me to remove the code, please dm me on discord at nonce#7444.
*/

import { Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import { client } from "../../index"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

var editSnipes = {};
var editSnipeArray = Array();


client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (oldMessage.partial || (oldMessage.embeds.length && !oldMessage.content) || oldMessage.author.bot) { return; }

	editSnipes[oldMessage.channel.id] = {
		author: oldMessage.author,
		oldcontent: oldMessage.content,
        newcontent: newMessage.content,
	};

    editSnipeArray.unshift(editSnipes[oldMessage.channel.id]);
    console.log(editSnipeArray)
});

export default {
    category: "General",
    description: "snipes an edit",

    slash: false,

    ownerOnly: false,
    testOnly: true,

    callback: async ({ message, channel, args }) => {
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

            var snipe: any = editSnipes[channel.id];

            if (message.channel.id == "911060120400695316") {
                const NoSecretChannelEmbed = new MessageEmbed()
                    .setColor(`#${config["color"].error}`)
                    .setDescription(`**Sniping is not allowed in this channel!**`)
                message.channel.send({ embeds: [NoSecretChannelEmbed]});
                return;
            }

            if (args[0] == undefined) {
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
            } else {
                if (!isNaN(Number(args[0]))) {
                    var history = Number(args[0]) - 1

                    if (history < 0) {
                        ErrorEmbed(`Please enter a number larger than 0!`)
                        return
                    }

                    if (editSnipeArray.length <= history) {
                        ErrorEmbed(`Snipe message number ${Number(args[0])} does not exist! Try a number smaller or equal to ${editSnipeArray.length}!`)
                        return
                    }

                    const SnipeEmbed = new MessageEmbed()
                        .setAuthor(`${editSnipeArray[history].author.tag}`, `${editSnipeArray[history].author.displayAvatarURL({dynamic: true})}`)
                        .setColor(`#${config["color"].default}`)
                        .setDescription(`Old message: \`\`\`${editSnipeArray[history].oldcontent}\`\`\`\nEdited message: \`\`\`${editSnipeArray[history].newcontent}\`\`\``)
                    await message.channel.send({ embeds: [SnipeEmbed] });
                } else {
                    ErrorEmbed(`${args[0]} is not a valid number!`)
                    return
                }
            }
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
