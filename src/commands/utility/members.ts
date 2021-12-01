import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Replies with pong",
    aliases: ["membercount", "member"],
    
    slash: false,
    cooldown: "5s",
    
    ownerOnly: false,
    testOnly: true,

    callback: ({ message, client }) => {
        if (config["list"].blacklisted.includes(message.author.id)) { return; }
        const guild = client.guilds.cache.get(config.tourneys_id);
        var memberCount = guild?.memberCount;
        const embed = new MessageEmbed()
            .setDescription(`Tourneys has **${memberCount}** members`)
            .setColor(`#${config["color"].default}`);
        message.channel.send({
            embeds: [embed]
        })
        
        try { } catch (error) {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
            return;
        }
    }
} as ICommand;