import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Assassin",
    description: "Displays all the available VIP servers",
    aliases: ["VIP", "server", "VIP-servers", "VIP-server", "VIPserver"],
    
    slash: false,
    
    ownerOnly: false,
    testOnly: true,

    callback: ({ message }) => {
        const embed = new MessageEmbed()
            .setTitle(`🪧 Public VIP Servers 🪧`)
            .setColor(`#${config["color"].default}`)
            .setDescription(`We have multiple VIP servers that are funded for you to use for anything; 1v1s, Scrims, etc.`)
            .addFields(
                {
                    name: `__**Chicken**__`,
                    value: "> https://www.roblox.com/games/379614936?privateServerLinkCode=18166094017767430485970987609076\n> Funded by <@736809140898496543>",
                    inline: false,
                },
                {
                    name: `__**Cobra**__`,
                    value: "> https://www.roblox.com/games/379614936?privateServerLinkCode=07520520483819078784237099799886\n> Funded by <@280049725582082048>",
                    inline: false,
                },
                {
                    name: `__**Dillon**__`,
                    value: "> https://www.roblox.com/games/379614936?privateServerLinkCode=76092166450737891203250642878269\n> Funded by <@841058819848536085>",
                    inline: false,
                },
                {
                    name: `__**jxemo**__`,
                    value: "> https://www.roblox.com/games/379614936?privateServerLinkCode=18062227398402765602561296518186\n> Funded by <@477950742229942302>",
                    inline: false,
                },
                /*
                {
                    name: `__**Peppa**__`,
                    value: "> - [Link](https://www.roblox.com/games/379614936/NEW-Assassin?privateServerLinkCode=11409783693522092316446620484402)",
                    inline: true,
                },
                {
                    name: `__**Steven**__`,
                    value: "> - [Link](https://www.roblox.com/games/379614936?privateServerLinkCode=37938804575985906324380910122518)",
                    inline: true,
                },
                */
            )
        message.channel.send({
            embeds: [embed]
        }).catch((error) => {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
            return;
        });
    }
} as ICommand;