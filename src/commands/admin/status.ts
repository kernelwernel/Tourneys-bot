import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Sets the bots status",

    slash: false,
    cooldown: '2m',

    minArgs: 1,
    expectedArgs: "<status> <type>",

    permissions: ["MANAGE_GUILD"],
    ownerOnly: true,
    testOnly: true,

    callback: ({ client, message, text }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
            const embed = new MessageEmbed()
                .setDescription(`Status has been updated to **${text}**`)
                .setColor(`#${config["color"].default}`);
                client.user?.setPresence({
                    status: "dnd",
                    activities: [
                        {
                            name: text
                        }
                    ]
                })
            message.channel.send({
                embeds: [embed]
            })
            
        } catch(error) {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
            return;
        };
    }
} as ICommand;