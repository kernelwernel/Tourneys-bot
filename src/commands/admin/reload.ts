import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Reloads all the commands and .ts files of the bot",
    aliases: ["refresh", "reboot"],

    slash: false,
    
    permissions: ["MANAGE_GUILD"],
    ownerOnly: true,
    testOnly: true,

    callback: async ({ message, client }) => {
        console.log(`${LOG.SYSTEM_RELOADING}`);

        client.user?.setActivity(`for ${config.prefix}help`, { type: "WATCHING" });
        
        const embed = new MessageEmbed()
            .setTitle(`🛠 Admin panel 🛠`)
            .setDescription(`\`\`\`> Commands have been reloaded\`\`\``)
            .setColor(`#${config["color"].admin}`);
            for (const path in require.cache) {
                if (path.endsWith('.ts')) {
                    delete require.cache[path];
                }
            }
        const newMessage = await message.reply({
            embeds: [embed]
        })

        const newEmbed = newMessage.embeds[0];
        newEmbed.setDescription("\`\`\`> Commands have been reloaded\n> Bot configurations have been reloaded\`\`\`");
        newMessage.edit({
            embeds: [newEmbed]
        }).catch((error) =>{
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
            return;
        });

        console.log(`${LOG.SYSTEM_RELOADED}`);
    }
} as ICommand;
