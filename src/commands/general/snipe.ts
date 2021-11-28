import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG from "../../headers/logs.json"


export default {
    category: "General",
    description: "snipe command",

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: ({ message, client }) => {
    // TODO: add the  snipe command functionality

/*
        .catch((error) =>{
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`)
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG["SYSTEM"].ERROR} - ${error}`);
            return;
        });
*/
    }
} as ICommand;
