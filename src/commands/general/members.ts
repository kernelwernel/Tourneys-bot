import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Replies with pong",
    aliases: ["membercount", "member"],
    
    slash: "both",
    
    ownerOnly: false,
    testOnly: false,

    callback: ({ message, client }) => {
        const guild = client.guilds.cache.get(config.tourneys_id);
        var memberCount = guild?.memberCount;
        const embed = new MessageEmbed()
            .setDescription(`Tourneys has **${memberCount}** members`)
            .setColor(`#${config["color"].default}`)
        message.channel.send({
            embeds: [embed]
        })
    }
} as ICommand