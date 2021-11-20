import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Replies with pong",
    aliases: ["VIP", "server", "VIP-servers", "VIP-server", "VIPserver"],
    
    slash: "both",
    
    ownerOnly: false,
    testOnly: false,

    callback: ({ message }) => {
        const embed = new MessageEmbed()
            .setTitle(`🪧 Public VIP Servers 🪧`)
            .setColor(`#${config["color"].default}`)
            .setDescription(`We have multiple VIP servers that are funded for you to use for anything; 1v1s, Scrims, etc.`)
            .addFields(
                {
                    name: `__**Chicken**__`,
                    value: "> https://www.roblox.com/games/379614936?privateServerLinkCode=33448635869382036008322697977192\n> Funded by <@736809140898496543>",
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
                
                 NOTE; make the fields inline = true if there's a pair number of fields
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
                
            )
        message.channel.send({
            embeds: [embed]
        })
    }
} as ICommand
