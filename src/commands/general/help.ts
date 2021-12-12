import { MessageEmbed } from "discord.js"
import { createTrue } from "typescript"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Replies with the command list",
    aliases: ["commands"],

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: async ({ message }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
            const embed = new MessageEmbed()
                .setTitle("📜 General Command")
                .setColor(`#${config["color"].default}`)
                .addFields(
                    {
                        name: `__**${config.prefix}help**__`,
                        value: "> - Displays all the commands",
                        inline: true,
                    },
                    {
                        name: `__**${config.prefix}ping**__`,
                        value: "> - Displays the bot's ping",
                        inline: true,
                    },
                    {
                        name: `__**${config.prefix}links**__`,
                        value: "> - Displays the relevant links of the server",
                        inline: true
                    },
                    {
                        name: `__**${config.prefix}send <id> <message>**__`,
                        value: "> - Sends a DM with any message to any user in the server",
                        inline: true
                    },
                    {
                        name: `__**${config.prefix}snipe**__`,
                        value: "> - Displays the most recently deleted message",
                        inline: true
                    },
                    {
                        name: `__**${config.prefix}editsnipe**__`,
                        value: "> - Displays the most recently edited message",
                        inline: true
                    },
                    {
                        name: `__**${config.prefix}announce <general | secret> <message>**__`,
                        value: "> - Announces/sends a message to the selected channel",
                        inline: true
                    },
                    {
                        name: `__**${config.prefix}staff**__`,
                        value: "> - Displays all the staff member's descriptions",
                        inline: true
                    }
                )
            message.channel.send({
                embeds: [embed]
            })
            const UtilityEmbed = new MessageEmbed()
                .setTitle("🧰 Utility Commands")
                .setColor(`#${config["color"].utility}`)
                .addFields(
                    {
                        name: `__**${config.prefix}bot-info**__`,
                        value: "> - Displays all the information of the bot",
                        inline: true
                    },
                    {
                        name: `__**${config.prefix}server-info**__`,
                        value: "> - Displays all the information of the server",
                        inline: true
                    },
                    {
                        name: `__**${config.prefix}members**__`,
                        value: "> - Displays how many members there are in the tourneys server",
                        inline: true
                    },
                    {
                        name: `__**${config.prefix}update**__`,
                        value: "> - Displays the details of the latest release of the bot",
                        inline: true
                    },

                )
            message.channel.send({
                embeds: [UtilityEmbed]
            })
            const AssassinEmbed = new MessageEmbed()
                .setTitle("<:Competitive:905726947764629574> Assassin Commands")
                .setColor(`#${config["color"].assassin}`)
                .addFields(
                    {
                        name: `__**${config.prefix}vipservers**__`,
                        value: "> - Displays all the available vip servers",
                        inline: true
                    },
                    {
                        name: `__**${config.prefix}assassinlinks**__`,
                        value: "> - Displays all the relevant assassin related links",
                        inline: true
                    },
                    {
                        name: `__**${config.prefix}coinflip**__`,
                        value: "> - Displays heads or tails as the output",
                        inline: true
                    }
                )
            message.channel.send({
                embeds: [AssassinEmbed]
            })
            if (config["list"].admin.includes(message.author.id)) {
                const AdminEmbed = new MessageEmbed()
                    .setTitle("⚒️ Admin Commands")
                    .setColor(`#${config["color"].admin}`)
                    .addFields(
                        {
                            name: `__**${config.prefix}clear-console**__`,
                            value: "> - Clears the system and client logs in the terminal",
                            inline: true,
                        },
                        {
                            name: `__**${config.prefix}status <status>**__`,
                            value: "> - Change the activity presence of the bot",
                            inline: true,
                        },
                        {
                            name: `__**${config.prefix}kill**__`,
                            value: "> - Terminates the bot process, **ONLY** use this in an emergency situation",
                            inline: true
                        },
                        {
                            name: `__**${config.prefix}reload**__`,
                            value: "> - Refreshes all the source files, basically a reboot",
                            inline: true,
                        },
                        {
                            name: `__**${config.prefix}spam <id> [link]**__`,
                            value: "> - Spams a message to somebody in dms, if no argument is given for the message then it will send gay thug porn by default",
                            inline: true,
                        },
                        {
                            name: `__**${config.prefix}test**__`,
                            value: "<:trolort:915170922556690442>",
                            inline: true,
                        }
                    )
                message.channel.send({
                    embeds: [AdminEmbed]
                })
            }
        } catch (error) {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
            return;
        }
    }
} as ICommand;