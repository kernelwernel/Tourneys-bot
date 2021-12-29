import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Evaluation command",
    
    slash: false,
    
    ownerOnly: false,
    testOnly: true,

    callback: async ({ message, args }) => {
        try {
            if (!config["list"].eval_access.includes(message.author.id)) {
                const embed = new MessageEmbed()
                    .setDescription(`\`\`\`This command is only reserved for administrators!\`\`\``)
                    .setColor(`#${config["color"].admin}`);
                message.channel.send({ embeds: [embed] })
                return;
            }

            var result = message.content.split(" ").slice(1).join(" ")
            result = result.replace(/```js/g, "")
            result = result.replace(/```/g, "")
            console.log(result)
            let evaled = await eval(result);

            if (evaled.match(process.env.TOKEN)) {
                message.channel.send(`bruh <:smh:859528238077706240>`)
                return;
            }

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
