import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Replies with the command list",

    slash: "both",

    ownerOnly: false,
    testOnly: false,

    callback: async ({ message, client, interaction }) => {
        const embed = new MessageEmbed()
            .setTitle("📜 Command List 📜")
            .setColor(`#${config.color}`)
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
                    value: "> - Pings the API latency of the bot",
                    inline: false,
                },
                {
                    name: `__**${config.prefix}links**__`,
                    value: "> - Returns with relevant links",
                    inline: false    
                },
            )
        message.channel.send({
            embeds: [embed]
        }).then(() => {
            if (config.admin_list.includes(message.author.id)) {
                const AdminEmbed = new MessageEmbed()
                    .setTitle("⚒️ Admin Command List ⚒️")
                    .setColor(`#${config.admin_color}`)
                    .addFields(
                        {
                            name: `__**${config.prefix}clear-console**__`, 
                            value: "> - Clears the system and client logs in the terminal",
                            inline: false,
                        },
                        {
                            name: `__**${config.prefix}test**__`,
                            value: "> <:trollgod:855435721624256542>",
                            inline: false,
                        },
                        {
                            name: `__**${config.prefix}status**__`, 
                            value: "> - Change the activity presence of the bot",
                            inline: false,
                        },
                        {
                            name: `__**${config.prefix}kill**__`,
                            value: "> - Terminates the bot process, **ONLY** use this in an emergency situation",
                            inline: false    
                        },
                        {
                            name: `__**${config.prefix}reload**__`, 
                            value: "> - Refreshes all the source files, basically a reload",
                            inline: false,
                        },
                        {
                            name: `__**${config.prefix}members**__`, 
                            value: "> - Displays the server's member count",
                            inline: false,
                        },
                        /*
                        {
                            name: `__**${config.prefix}reload**__`, 
                            value: "> - Refreshes all the source files, basically a reload",
                            inline: false,
                        },
                        */
                    )
                message.channel.send({
                    embeds: [AdminEmbed]
                })
            }
        })
    } 
} as ICommand