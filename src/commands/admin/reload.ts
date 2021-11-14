import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import LOG_TAGS from "../../logs"
import * as config from "../../config.json"


export default {
    category: "Admin",
    description: "Just a simple test command to see if the bot works",
    
    slash: false,
    
    permissions: ["ADMINISTRATOR"],
    ownerOnly: true,
    testOnly: true,

    callback: ({ message }) => {
        const LOG = new LOG_TAGS();
        console.log(`${LOG.SYSTEM_RELOADING}`)

        for (const path in require.cache) {
            if (path.endsWith('.ts')) {
                delete require.cache[path]
            }
        }
        
        console.log(`${LOG.SYSTEM_RELOADED}`)
        const embed = new MessageEmbed()
            .setTitle(`🛠 Admin panel 🛠`)
            .setDescription(`\`\`\`> Commands have been reloaded\`\`\``)
            .setColor(`#${config.admin_color}`)
        return embed
    }
} as ICommand
