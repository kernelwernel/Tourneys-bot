import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import * as data from "../../../package.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Displays the bot's information",
    aliases: ["botinfo", "bot"],
    
    slash: false,

    ownerOnly: false,
    testOnly: true,

    callback: ({ client, message }) => {
        let totalSeconds = (client.uptime! / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);

        const embed = new MessageEmbed()
            .setColor(`#${config["color"].default}`)
            .addFields(
                { name: `__**Bot version**__`, value: `> 🏷 - 1.0`, inline: false },
                { name: `__**Bot uptime**__`, value: `> ⏲ - ${days} days, ${hours} hours, ${minutes} minutes`},
                { name: `__**Discord.js version**__`, value: `> <:djs:909502528490725446> - ${data.dependencies["discord.js"].substring(1)}`, inline: false },
                { name: `__**Discord.js API latency**__`, value: `> 📡 - ${Math.round(client.ws.ping)}ms`, inline: false },
                { name: `__**Language used**__`, value: `> <:Typescript:909503375433928764> - TypeScript`, inline: false },
                { name: "__**Tourneys bot source code:**__", value: `> <:github:798841111338680330> - ${config.repo_link}`, inline: false },
                { name: "__**Docker container:**__", value: "> <:docker:910267595045883914> - https://hub.docker.com/r/nonce1/tourneys-bot", inline: false },
                { name: `__**Credits**__`, value: `> <:777964368717414410:798168215020109895> - ${config.author}`, inline: false },
                /*
                { name: `__****__`, value: `>  - `, inline: false },
                */
            );
        message.channel.send({
            embeds: [embed]
        }).catch((error) =>{
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
