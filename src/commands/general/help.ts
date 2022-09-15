import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Displays a menu of the command list and categories",
    aliases: ["commands"],

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: async ({ message, args }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }

            const ErrorEmbed = new MessageEmbed()
                .setColor(`#${config["color"].error}`)
                .setDescription(`Invalid option! please try again.`)

            const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Select the command category")
                .addOptions([
                    {
                        label: "General",
                        description: "Usual commands like ping, help, etc...",
                        value: "1"
                    },
                    {
                        label: "Utility",
                        description: "Miscellaneous info commands",
                        value: "2"
                    },
                    {
                        label: "Assassin",
                        description: "Roblox asassin related commands",
                        value: "3"
                    },
                    {
                        label: "Admin",
                        description: "Administrative commands for the server staff",
                        value: "4"
                    },
                ])
            )
        
            const GeneralEmbed = new MessageEmbed()
                .setTitle("📜 General Commands 📜")
                .setColor(`#${config["color"].default}`)
                .addFields(
                    {
                        name: `**${config.prefix}help \`[category]\`**`,
                        value: "> - Displays all the commands",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}ping**`,
                        value: "> - Displays the bot's ping",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}links**`,
                        value: "> - Displays the relevant links of the server",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}send \`<id>\` \`<message>\`**`,
                        value: "> - Sends a DM with any message to any user in the server",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}snipe**`,
                        value: "> - Displays the most recently deleted message",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}editsnipe**`,
                        value: "> - Displays the most recently edited message",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}announce \`<general | secret>\` \`<message>\`**`,
                        value: "> - Announces/sends a message to the selected channel",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}staff**`,
                        value: "> - Displays all the staff member's descriptions",
                        inline: false,
                    }
                )
                .setFooter(`\n<> = required\n[] = optional`)

            const UtilityEmbed = new MessageEmbed()
                .setTitle("🧰 Utility Commands 🧰")
                .setColor(`#${config["color"].utility}`)
                .addFields(
                    {
                        name: `**${config.prefix}bot-info**`,
                        value: "> - Displays all the information of the bot",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}server-info**`,
                        value: "> - Displays all the information of the server",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}suggest <message>**`,
                        value: `> - Sends a suggestion to <#${config["channels"].posts}>`,
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}members**`,
                        value: "> - Displays how many members there are in the tourneys server",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}update**`,
                        value: "> - Displays the details of the latest release of the bot",
                        inline: false,
                    }
                )
                .setFooter(`\n<> = required`)

            const AssassinEmbed = new MessageEmbed()
                .setTitle("<:Competitive:905726947764629574> Assassin Commands <:Competitive:905726947764629574>")
                .setColor(`#${config["color"].assassin}`)
                .addFields(
                    {
                        name: `**${config.prefix}vipservers**`,
                        value: "> - Displays all the available vip servers",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}assassinlinks**`,
                        value: "> - Displays all the relevant assassin related links",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}coinflip**`,
                        value: "> - Displays heads or tails as the output",
                        inline: false,
                    }
                )

            const AdminEmbed = new MessageEmbed()
                .setTitle("⚒️ Admin Commands ⚒️")
                .setColor(`#${config["color"].admin}`)
                .addFields(
                    {
                        name: `**${config.prefix}clear-console**`,
                        value: "> - Clears the system and client logs in the terminal",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}status \`<status>\`**`,
                        value: "> - Change the activity presence of the bot",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}kill \`<local | server>\`**`,
                        value: "> - Terminates the bot process, **ONLY** use this in an emergency situation",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}reload**`,
                        value: "> - Refreshes all the source files, basically a reboot",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}spam \`<id>\` \`[message]\`**`,
                        value: "> - Spams a message to somebody in dms, if no argument is given for the message then it will send gay thug porn by default",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}eval \`<code>\`**`,
                        value: "> - Tests any JavaScript code that's inputted",
                        inline: false,
                    },
                    {
                        name: `**${config.prefix}test**`,
                        value: "<:trolort:915170922556690442>",
                        inline: false,
                    }
                )
                .setFooter(`\n<> = required\n[] = optional`)

            if (args.length == 0) {
                let embed = new MessageEmbed()
                    .setTitle("Welcome to the help menu! Please select the command category below!")
                    .setColor(`#${config["color"].discord}`)
                message.channel.send({ embeds: [embed], components: [row]})
            } else if (args.length != 0) {
                switch (args[0]) {
                    case "general": message.channel.send({ embeds: [GeneralEmbed] }); break;
                    case "utility": message.channel.send({ embeds: [UtilityEmbed] }); break;
                    case "assassin": message.channel.send({ embeds: [AssassinEmbed] }); break;
                    case "admin": message.channel.send({ embeds: [AdminEmbed] }); break;
                    default: message.channel.send({ embeds: [ErrorEmbed]}); break;
                }
            } else {
                message.channel.send({ embeds: [ErrorEmbed]});
                return;
            }

            const collector = message.channel.createMessageComponentCollector({
                componentType: "SELECT_MENU"
            })

            collector.on("collect", async (collected) => {
                const value = collected.values[0]
                switch (value) {
                    case "1": collected.reply({ embeds: [GeneralEmbed], ephemeral: true }); break;
                    case "2": collected.reply({ embeds: [UtilityEmbed], ephemeral: true }); break;
                    case "3": collected.reply({ embeds: [AssassinEmbed], ephemeral: true }); break;
                    case "4": collected.reply({ embeds: [AdminEmbed], ephemeral: true }); break;
                }
            })
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
