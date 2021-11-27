import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG from "../../headers/logs.json"

export default {
    category: "General",
    description: "Replies with the relevant links of the server",
    aliases: ["link"],

    slash: false,
    
    ownerOnly: false,
    testOnly: true,

    callback: ({ message }) => {
        const embed = new MessageEmbed()
            .setColor(`#${config["color"].default}`)
            .addFields(
                {name: "__**Vanity URL:**__", value: "\`\`\` discord.gg/tourneys \`\`\`"},
                {name: "__**Discord URL:**__", value: "> https://discord.gg/tourneys"},
                {name: "__**Official Roblox Group:**__", value: "> https://www.roblox.com/groups/6295427"},
                {name: "__**Tourneys ban appeal:**__", value: "> https://bit.ly/TourneysBanAppeal"},
                {name: "__**Tourneys bot source code:**__", value: "> https://github.com/Existential-nonce/Tourneys-bot"}
            )
        message.channel.send({
            embeds: [embed]
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
} as ICommand;