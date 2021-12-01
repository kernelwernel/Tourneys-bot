import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()


export default {
    category: "General",
    description: "snipe command",

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: ({ message, client }) => {
        if (config["list"].blacklisted.includes(message.author.id)) { return; }
    // TODO: add the  snipe command functionality

/*
        .catch((error) =>{
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`)
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
            return;
        });
*/
    }
} as ICommand;
