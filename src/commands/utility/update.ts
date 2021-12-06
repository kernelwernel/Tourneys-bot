import { Interaction, Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()
import * as config from "../../config.json"

export default {
    category: "Utility",
    description: "Displays the most recent update of the bot",
    aliases: ["releases"],

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: ({ message, client, interaction, text }) => {
        try {   
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
            const embed = new MessageEmbed()
                .setTitle(`🏷️ Tourneys bot v2.2 updates 🏷️`)
                .setDescription(`
- Added snipe command
- Made the announce command public
- Created channel shortcuts for the announce command
- Fixed announce command bug
- Patched bypassing for the announce command
- Corrected some typos in the documentation
- Added coinflip command

**[Full Changelog](https://github.com/Existential-nonce/Tourneys-bot/compare/v2.1...v2.2)**`)
                .setColor(`#${config["color"].default}`);
            message.channel.send({ embeds: [embed]})
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
} as ICommand
