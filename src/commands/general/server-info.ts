import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import * as data from "../../../package.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Displays the server information",
    aliases: ["server"],

    slash: "both",

    ownerOnly: false,
    testOnly: false,

    callback: ({ message, client, interaction, text }) => {
        const guild = client.guilds.cache.get(config.tourneys_id);
        var memberCount = guild?.memberCount;
        const embed = new MessageEmbed()
            .setColor(`#${config.color}`)
            .addFields(
                { name: `__**Members**__`, value: `> - **${memberCount}**`, inline: false },
                //{ name: `__**Creation date**__`, value: `> - `, inline: false },
                //{ name: `__****__`, value: `>  - `, inline: false },
            )
            .setFooter("More features will be added in the future, this is temporary lol")
        message.channel.send({
            embeds: [embed]
        })
    }
} as ICommand