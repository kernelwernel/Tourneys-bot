import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"

export default {
    category: "General",
    description: "Replies with the command list",

    slash: "both",

    ownerOnly: false,
    testOnly: false,

    callback: ({ message }) => {
        const embed = new MessageEmbed()
            .setTitle("📜 Command List 📜")
            .addFields(
                {
                    name: `__**${config.prefix}info**__`, 
                    value: "> - Displays all the bot's info",
                    inline: false,
                },
                {
                    name: `__**${config.prefix}ping**__`,
                    value: "> - Pings the bot",
                    inline: false,
                },
                {
                    name: `__**${config.prefix}latency**__`, 
                    value: "> - Pings the API latency of the bo",
                    inline: false,
                },
                {
                    name: `__**${config.prefix}links**__`,
                    value: "> - Returns with the server's invite link",
                    inline: false    
                },
                /*
                {
                    name: `__**${config.prefix}**__`, 
                    value: "> - ",
                    inline: false,
                },
                */
            )

            if (config.admin_list.includes(message.author.id)) {
                const admin_embed = new MessageEmbed()
                    .setTitle("⚒️ Admin Command List ⚒️")
                return admin_embed
            }
        return embed
    }
} as ICommand