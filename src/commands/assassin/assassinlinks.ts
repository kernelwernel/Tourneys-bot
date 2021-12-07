import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Replies with the relevant links of the Assassin game",
    aliases: ["alink", "assassinlink"],

    slash: false,
    cooldown: "5s",
    
    ownerOnly: false,
    testOnly: true,

    callback: ({ message }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
            const embed = new MessageEmbed()
                .setColor(`#${config["color"].default}`)
                .addFields(
                    {name: "__**Invite URL:**__", value: "\`\`\` discord.gg/assassin \`\`\`"},
                    {name: "__**Official Roblox Group:**__", value: "> https://www.roblox.com/groups/2923391/Assassin-Community#!/about"},
                    {name: "__**Trading Server 1**__", value: "> [Link](https://www.roblox.com/games/379614936/Assassin?privateServerLinkCode=93847588442724491977677606429313)", inline: true},
                    {name: "__**Trading Server 2**__", value: "> [Link](https://www.roblox.com/games/379614936/Assassin?privateServerLinkCode=07060905411906544262644429865220)", inline: true},
                    {name: "__**Trading Server 3**__", value: "> **[LINK EXPIRED]**", inline: true},
                    {name: "__**Trading Server 4**__", value: "> **[LINK EXPIRED]**", inline: true},
                    {name: "__**Trading Server 5**__", value: "> [Link](https://www.roblox.com/games/379614936/Assassin?privateServerLinkCode=ee7QfPfpqjxwuLcRHNLvhKQiGDYoHrQ1)", inline: true},
                    {name: "__**Trading Server 6**__", value: "> [Link](https://www.roblox.com/games/379614936/Assassin?privateServerLinkCode=72502827452585722543697010398959)", inline: true},
                )
            message.channel.send({
                embeds: [embed]
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