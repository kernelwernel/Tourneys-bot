import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Evaluation command",
    
    slash: false,
    cooldown: "5s",
    
    ownerOnly: false,
    testOnly: true,

    callback: async ({ message, args }) => {
        try {
            if (!message.member?.roles.cache.has(`${config["roles"].owner}`)
                || !message.member?.roles.cache.has(`${config["roles"].co_owner}`)
                || message.author.id != `${config.authorID}`) {
                const embed = new MessageEmbed()
                    .setDescription(`\`\`\`This command is only reserved for administrators!\`\`\``)
                    .setColor(`#${config["color"].admin}`);
                message.channel.send({ embeds: [embed] })
                return;
            }

            const clean = async (text: string) => {
                if (text && text.constructor.name == "Promise") {
                    text = text;
                }
    
                if (typeof text !== "string") {
                    text = require("util").inspect(text, { depth: 1 });
                }
                
                text = text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203));
                return text;
            }

            const evaled = eval(args.join(" "));
            const cleaned = await clean(evaled);

            const embed = new MessageEmbed()
                .setDescription(`\`\`\`js\n${evaled}\n\`\`\``)
                .setColor(`#${config["color"].admin}`);
            message.channel.send({ embeds: [embed] })


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
