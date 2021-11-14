import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import * as data from "../../../package.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Displays the bot's information",
    aliases: ["botinfo", "bot"],
    
    slash: "both",

    ownerOnly: false,
    testOnly: false,

    callback: ({ message, client, interaction, text }) => {
        const embed = new MessageEmbed()
            .setColor(`#${config.color}`)
            .addFields(
                { name: `__**Bot version**__`, value: `> 🏷 - 1.0`, inline: false },
                { name: `__**Bot Admins**__`, 
                    value: `>>> <:e63co024yh741:799633702590087238> - <@${config.admin_list[0]}>
                    <:e63co024yh741:799633702590087238> - <@${config.admin_list[1]}>
                    <:e63co024yh741:799633702590087238> - <@${config.admin_list[5]}>
                    <:e63co024yh741:799633702590087238> - <@${config.admin_list[2]}>
                    <:777960446257922068:798168229771870278> - <@${config.admin_list[3]}>
                    <:777960446257922068:798168229771870278> - <@${config.admin_list[4]}>
                    <:777960446257922068:798168229771870278> - <@${config.admin_list[6]}>
                    <:777960446257922068:798168229771870278> - <@${config.admin_list[7]}>`,
                    inline: false },
                { name: `__**Discord.js version**__`, value: `> <:djs:909502528490725446> - ${data.dependencies["discord.js"].substring(1)}`, inline: false },
                { name: `__**Discord.js API latency**__`, value: `> 📡 - ${Math.round(client.ws.ping)}ms`, inline: false },
                { name: `__**Language used**__`, value: `> <:Typescript:909503375433928764> - TypeScript`, inline: false },
                { name: "__**Tourneys Bot source code:**__", value: `> <:github:798841111338680330> - ${config.repo_link}`, inline: false },
                { name: `__**Credits**__`, value: `> <:777964368717414410:798168215020109895> - ${config.author}`, inline: false },
                /*
                { name: `__****__`, value: `>  - `, inline: false },
                { name: `__****__`, value: `>  - `, inline: false },
                { name: `__****__`, value: `>  - `, inline: false },
                */
            )
        return embed
    } 
} as ICommand

