import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Blacklist the selected argument",
    aliases: ["bl"],

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: ({ message, client, interaction, text }) => {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();

        let SendID: String
        let blList: string
        let blacklistUser: string
        let SnowflakeIsValid: boolean

        function ErrorEmbed() {
            const IncorrectEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription("\`\`\`> Invalid argument! Please try again.\nCorrect usage:\n ;blacklist <id>\`\`\`")
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [IncorrectEmbed] }).then(() => {
                message.delete()
            })
        }

        function ValidSnowflake(Snowflake: string | any[]) {
            switch (Snowflake.length) {
                case 18:
                    return SnowflakeIsValid = true
                default:
                    return SnowflakeIsValid = false
            }
        }

        if (!args.length || !ValidSnowflake(args[0])) {
            return ErrorEmbed()
        } else {
            blacklistUser = args[0]

        }
    }
} as ICommand
