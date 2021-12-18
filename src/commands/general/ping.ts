import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Replies with pong",
    
    slash: false,
    cooldown: "3s",
    
    ownerOnly: false,
    testOnly: true,

    callback: ({ message }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
            const embed = new MessageEmbed()
                .setDescription(`🏓 **Pong!** - ${Date.now() - message.createdTimestamp}ms`)
                .setColor(`#${config["color"].default}`);
            message.channel.send({
                embeds: [embed]
            })
        } catch (error) {
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