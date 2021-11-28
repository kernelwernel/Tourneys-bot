import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG from "../../headers/logs.json"

export default {
    category: "Admin",
    description: "Just a simple test command to see if the bot works",
    
    slash: false,
    
    ownerOnly: false,
    testOnly: true,

    callback: ({ message, client }) => {
        message.channel.send("<:trollgod:855435721624256542>").catch((error) => {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG["SYSTEM"].ERROR} - ${error}`);
            return;
        });
    }
} as ICommand;