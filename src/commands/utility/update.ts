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

    ownerOnly: false,
    testOnly: true,

    callback: ({ message, client, interaction, text }) => {
        const embed = new MessageEmbed()
            .setTitle(`🏷️ Tourneys bot v2.0 updates 🏷️`)
            .setDescription(`
- Added deployment workflows
- Added github container registry to the bot repository
- Added Dockerfile for heroku to host
- Added catch net for each command if error occurs
- Added/Updated the following commands:
    - \`bot-info\`
    - \`help\`
    - \`send\`
    - \`server-info\`
- Added new command category section called "assassin"
- Udated and improved admin-only commands
- Updated \`README.md\` for better documentation
- Added useful development environment stuff such as makefiles
- Added a few other stuff for better collaboration
            
**[Full Changelog](https://github.com/Existential-nonce/Tourneys-bot/compare/v1.0...v2.0)**
`)
            .setColor(`#${config["color"].default}`);
        message.channel.send({ embeds: [embed]}).catch((error) => {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
            return;
        });
    }
} as ICommand