import { Interaction, Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import LOG from "../../headers/logs.json"
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
        const embed = new MessageEmbed()
            .setTitle(`🏷️ Tourneys bot v2.1 updates 🏷️`)
            .setDescription(`
- Added anti-raid feature
- Added anti-alt feature
- Added the ;announce and ;update commands
- Added the Utility section of commands
- Finished the ;server-info command
- Updated the ;send command where it'll automatically delete your message so you don't need to manually delete it yourself to hide it 

**[Full Changelog](https://github.com/Existential-nonce/Tourneys-bot/compare/v2.0...v2.1)**
`)
            .setColor(`#${config["color"].default}`);
        message.channel.send({ embeds: [embed]}).catch((error) => {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG["SYSTEM"].ERROR} - ${error}`);
            return;
        });
    }
} as ICommand
