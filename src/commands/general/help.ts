import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG from "../../headers/logs.json"

export default {
    category: "General",
    description: "Replies with the command list",
    aliases: ["commands"],

    slash: false,

    ownerOnly: false,
    testOnly: true,

    callback: async ({ message }) => {
        const embed = new MessageEmbed()
            .setTitle("📜 Command List 📜")
            .setColor(`#${config["color"].default}`)
            .addFields(
                {
                    name: `__**${config.prefix}help**__`,
                    value: "> - Displays all the bot's commands",
                    inline: false,
                },
                {
                    name: `__**${config.prefix}ping**__`,
                    value: "> - Pings the bot",
                    inline: false,
                },
                {
                    name: `__**${config.prefix}links**__`,
                    value: "> - Returns with relevant links of the server",
                    inline: false
                },
                {
                    name: `__**${config.prefix}send <id> <message>**__`,
                    value: "> - Sends a DM with any message to any user in the server",
                    inline: false
                },
                /*
                {
                    name: `__**${config.prefix}snipe**__`,
                    value: "> - Snipe the most recently deleted message (work in progress)",
                    inline: false
                },
                */
                {
                    name: `__**${config.prefix}members**__`,
                    value: "> - Displays the member count of the server",
                    inline: false
                },
                {
                    name: `__**${config.prefix}bot-info**__`,
                    value: "> - Displays the bot's info",
                    inline: false,
                },
                {
                    name: `__**${config.prefix}server-info**__`,
                    value: "> - Displays the server's relevant links (work in progress)",
                    inline: false
                },
                {
                    name: `__**${config.prefix}update**__`,
                    value: "> - Displays the latest update release of the bot"
                }
            )
        message.channel.send({
            embeds: [embed]
        }).then(() => {
            if (config["list"].admin.includes(message.author.id)) {
                const AdminEmbed = new MessageEmbed()
                    .setTitle("⚒️ Admin Command List ⚒️")
                    .setColor(`#${config["color"].admin}`)
                    .addFields(
                        {
                            name: `__**${config.prefix}clear-console**__`,
                            value: "> - Clears the system and client logs in the terminal",
                            inline: false,
                        },
                        {
                            name: `__**${config.prefix}status <status>**__`,
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
                            value: "> - Refreshes all the source files, basically a reboot",
                            inline: false,
                        },
                        {
                            name: `__**${config.prefix}announce <general | secret-general> <message>**__`,
                            value: "> - Announces/sends a message to the selected channel"
                        },
                        {
                            name: `__**${config.prefix}test**__`,
                            value: "> <:trollgod:855435721624256542>",
                            inline: false,
                        },
                    )
                message.channel.send({
                    embeds: [AdminEmbed]
                }).catch((error) => {
                    const ErrorEmbed = new MessageEmbed()
                        .setTitle(config["title"].error)
                        .setDescription(`\`\`\`${error}\`\`\``)
                        .setColor(`#${config["color"].error}`);
                    message.channel.send({ embeds: [ErrorEmbed] });
                    console.log(`${LOG["SYSTEM"].ERROR} - ${error}`);
                    return;
                });
            }
        })
    }
} as ICommand;