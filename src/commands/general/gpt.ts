import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()
import { ChatGPTAPIBrowser } from 'chatgpt'

export default {
    category: "General",
    description: "ChatGPT",
    
    slash: false,
    
    ownerOnly: false,
    testOnly: true,

    callback: async ({ message, args }) => {
        try {
            if (args.length == 0) { 
                const ErrorEmbed = new MessageEmbed()
                    .setTitle(config["title"].error)
                    .setDescription(`\`\`\`Please input an argument!\`\`\``)
                    .setColor(`#${config["color"].error}`);
                message.channel.send({ embeds: [ErrorEmbed] });
                return;
            }

            const api = new ChatGPTAPIBrowser({
                email: process.env.OPENAI_EMAIL as string,
                password: process.env.OPENAI_PASSWORD as string
            })
            await api.initSession()

            const result = await api.sendMessage(args.join(' '))
            message.reply(result.response)
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