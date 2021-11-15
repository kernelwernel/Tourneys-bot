import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Replies with the relevant links of the server",
    aliases: ["link"],

    slash: "both",
    
    ownerOnly: false,
    testOnly: false,

    callback: ({ message }) => {
        const embed = new MessageEmbed()
            .addFields(
                {name: "__**Vanity URL:**__", value: "\`\`\` discord.gg/tourneys \`\`\`"},
                {name: "__**Discord URL:**__", value: "> https://discord.gg/tourneys"},
                {name: "__**Official Roblox Group:**__", value: "> https://www.roblox.com/groups/6295427"},
                {name: "__**Tourneys ban appeal:**__", value: "> https://bit.ly/TourneysBanAppeal"},
                {name: "__**Tourneys Bot source code:**__", value: "> https://github.com/Existential-nonce/Tourneys-bot"}
            )
            .setColor(`#${config.color}`)
        return embed
    }
} as ICommand