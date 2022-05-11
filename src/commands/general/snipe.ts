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
var snipearray = Array();

client.on("messageDelete", async (message) => {

    /*
    * for anybody looking at this, i'm only writing these
    * slurs/derogative words in the context to detect
    * and stop people from bypassing.
    * I'm not writing these for any kind of discriminatorial
    * reason or anything based on my personal/racial or any offensive beliefs whatsoever.
    */

    const antibypass = /nigger|niger|nigga|niga|kys|retard|faggot|fag/

    if (message.partial || (message.embeds.length && !message.content) || message.author.bot) { return; }
    let bypassMessage = message.content
    bypassMessage = bypassMessage.replace("1", "i")
    bypassMessage = bypassMessage.replace("3", "e")
    bypassMessage = bypassMessage.replace("0", "o")
    bypassMessage = bypassMessage.replace("4", "a")
    bypassMessage = bypassMessage.replace("@everyone", "(@)everyone")
    bypassMessage = bypassMessage.replace("@here", "(@)here")

    var bypassTest: boolean;

    if (bypassMessage.toLowerCase().match(antibypass)) {
        bypassTest = true
    } else {
        bypassTest = false
    }

    snipes[message.channel.id] = {
        author: message.author,
        content: message.content,
        createdAt: message.createdTimestamp,
        image: message.attachments.first() ? message.attachments.first()?.proxyURL : null,
        bypass: bypassTest
    };
    snipearray.unshift(snipes[message.channel.id]);
    console.log(snipes[message.channel.id]);
});

export default {
    category: "General",
    description: "snipe command",

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
    
            var snipe: any = snipes[channel.id];
            let bypass: boolean = false

            if (!snipe) {
                const NoSnipeEmbed = new MessageEmbed()
                    .setColor(`#${config["color"].error}`)
                    .setDescription(`**There is nothing to snipe!**`)
                message.channel.send({ embeds: [NoSnipeEmbed]});
                return;
            }

            if (message.channel.id == "911060120400695316") {
                const NoSecretChannelEmbed = new MessageEmbed()
                    .setColor(`#${config["color"].error}`)
                    .setDescription(`**Sniping is not allowed in this channel!**`)
                message.channel.send({ embeds: [NoSecretChannelEmbed]});
                return;
            }
            
            if (args[0] == undefined) {
                const SnipeEmbed = new MessageEmbed()
                    .setAuthor(`${snipe.author.tag}`, `${snipe.author.displayAvatarURL({dynamic: true})}`)
                    snipe.bypass ? SnipeEmbed.setColor(`#${config["color"].error}`) : SnipeEmbed.setColor(`#${config["color"].default}`) 
                    snipe.content ? SnipeEmbed.setDescription(`\`\`\`${snipe.content}\`\`\``) : null;
                    snipe.image ? SnipeEmbed.setImage(snipe.image) : null;
                    snipe.bypass ? SnipeEmbed.setDescription(`\`\`\`The sniped message contains a bypassed word.\`\`\``) : null;
                    snipe.bypass ? SnipeEmbed.setFooter(`blame folder for this he made me add this shit feature that i already removed smh`) : null;
                await message.channel.send({ embeds: [SnipeEmbed] });
            } else {
                if (!isNaN(Number(args[0]))) {
                    var history = Number(args[0]) - 1
                    if (history < 0) {
                        ErrorEmbed(`Please enter a number larger than 0!`)
                        return
                    }

                    if (snipearray.length <= history) {
                        //ErrorEmbed(`Please enter a number smaller or equal to the sniped messages count! (${snipearray.length})`)
                        ErrorEmbed(`Snipe message number ${Number(args[0])} does not exist! Try a number smaller or equal to ${snipearray.length}!`)
                        return
                    }

                    const SnipeEmbed = new MessageEmbed()
                        .setAuthor(`${snipearray[history].author.tag}`, `${snipearray[history].author.displayAvatarURL({dynamic: true})}`)
                        snipearray[history].bypass ? SnipeEmbed.setColor(`#${config["color"].error}`) : SnipeEmbed.setColor(`#${config["color"].default}`) 
                        snipearray[history].content ? SnipeEmbed.setDescription(`\`\`\`${snipearray[history].content}\`\`\``) : null;
                        snipearray[history].image ? SnipeEmbed.setImage(snipearray[history].image) : null;
                        snipearray[history].bypass ? SnipeEmbed.setDescription(`\`\`\`The sniped message contains a bypassed word.\`\`\``) : null;
                        snipearray[history].bypass ? SnipeEmbed.setFooter(`blame folder for this he made me add this shit feature that i already removed smh`) : null;
                    await message.channel.send({ embeds: [SnipeEmbed] });
                } else {
                    ErrorEmbed(`${args[0]} is not a valid number!`)
                    return
                }
/*

                const SnipeEmbed = new MessageEmbed()
                    .setAuthor(`${snipe.author.tag[0]}`, `${snipe.author.displayAvatarURL({dynamic: true})}`)
                    bypass ? SnipeEmbed.setColor(`#${config["color"].error}`) : SnipeEmbed.setColor(`#${config["color"].default}`) 
                    snipe.content[0] ? SnipeEmbed.setDescription(`\`\`\`${snipe.content[0]}\`\`\``) : null;
                    snipe.image[0] ? SnipeEmbed.setImage(snipe.image) : null;
                    bypass ? SnipeEmbed.setDescription(`\`\`\`The sniped message contains a bypassed word.\`\`\``) : null;
                    bypass ? SnipeEmbed.setFooter(`blame folder for this he made me add this shit feature that i already removed smh`) : null;
                await message.channel.send({ embeds: [SnipeEmbed] });
*/
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
