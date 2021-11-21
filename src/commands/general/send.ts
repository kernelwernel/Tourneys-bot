import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Sends a DM message to somebody in the server",
    aliases: ["say"],
    
    slash: false,
    cooldown: "5s",
    
    ownerOnly: false,
    testOnly: false,

    callback: ({ message, client }) => {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();

        if (!args.length) {
            const IncorrectEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription("\`\`\`> Invalid argument! Please try again.\nCorrect usage: ;send <id> <message>\`\`\`")
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [IncorrectEmbed] });
            return;
        } else {
            console.log(`${LOG.CLIENT_COMMAND} ${message.author.tag} - ${message.content}`);

            let DMmessage = args.slice(1).join(" ");
            let SendID = args.shift();
            DMmessage.toString();

            client.users.fetch(`${SendID}`).then((user) => {
                user.send(`${DMmessage}`);
                const SentEmbed = new MessageEmbed()
                    .setDescription(`**Message to <@${SendID}> sent!**`)
                    .setColor(`#${config["color"].default}`);
                message.channel.send({ embeds: [SentEmbed] });
            }).catch((error) => {
                if (config["list"].admin.includes(message.author.id)) {
                    const AdminErrorEmbed = new MessageEmbed()
                        .setTitle(config["title"].error)
                        .setDescription(`\`\`\`${error}\`\`\``)
                        .setColor(`#${config["color"].error}`);
                    message.channel.send({ embeds: [AdminErrorEmbed] });
                    console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
                    return;
                } else {
                    const RegularErrorEmbed = new MessageEmbed()
                        .setTitle(config["title"].error)
                        .setDescription(`\`\`\`Either the id you've provided is incorrect or there has been an error in Discord's servers\`\`\``)
                        .setColor(`#${config["color"].error}`);
                    message.channel.send({ embeds: [RegularErrorEmbed] });
                    console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
                    return;
                };
            });
        };
    }
} as ICommand;