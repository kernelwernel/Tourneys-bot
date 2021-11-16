import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()


export default {
    category: "Admin",
    description: "Reload all the commands and .ts files of the bot",
    
    slash: false,
    
    permissions: ["MANAGE_GUILD"],
    ownerOnly: true,
    testOnly: true,

    callback: ({ message, client }) => {
        console.log(`${LOG.SYSTEM_RELOADING}`)

        client.user?.setActivity(`for ${config.prefix}help`, { type: "WATCHING" });

        for (const path in require.cache) {
            if (path.endsWith('.ts')) {
                delete require.cache[path]
            }
        }
        
        const embed = new MessageEmbed()
            .setTitle(`🛠 Admin panel 🛠`)
            .setDescription(`\`\`\`> Commands have been reloaded\`\`\``)
            .setColor(`#${config.admin_color}`)
        message.channel.send({
            embeds: [embed]
        }).catch((error) => {
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`)
            process.exit(1)
        })

        console.log(`${LOG.SYSTEM_RELOADED}`)
    }
} as ICommand
