import { MessageEmbed, GuildManager } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG from "../../headers/logs.json"

export default {
    category: "General",
    description: "Sends a DM message to somebody in the server",
    aliases: ["say"],
    
    slash: false,
    cooldown: "4s",
    
    ownerOnly: false,
    testOnly: true,

    callback: ({ message, client }) => {

        /*
        if (!(message.channel.id = "909224884939419708")) {
            message.delete();
        }
        */

        function ErrorEmbed() {
            message.delete()
            const IncorrectEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription("\`\`\`> Invalid argument! Please try again.\nCorrect usage:\n ;send <id> <message>\`\`\`")
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [IncorrectEmbed] })
        }

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();

        let SendID: string = ""
        let SnowflakeIsValid: boolean = false

        if (!args.length || args.length == 1) {
            return ErrorEmbed()
        }

        let DMmessage = args.slice(1).join(" ");
        SendID = args.shift()!;
        DMmessage.toString();

        if (SendID.length == 18) {
            SnowflakeIsValid = true
        }

        if (!(SnowflakeIsValid)) {
            return ErrorEmbed()
        } else {
            const adminchannels = new Array("913948455766990888", "913948495537377330", "909224884939419708");
            if (!adminchannels.includes(message.channel.id)) {
                message.delete()
            }

            console.log(`${LOG["CLIENT"].COMMAND} ${message.author.tag} - ${message.content}`);

            client.users.fetch(`${SendID}`).then((user) => {
                user.send(`${DMmessage}`);
                const SentEmbed = new MessageEmbed()
                    .setDescription(`**Message to <@${SendID}> sent!**`)
                    .setColor(`#${config["color"].default}`);
                message.channel.send({ embeds: [SentEmbed] })
            }).catch(async (error) => {
                if (config["list"].admin.includes(message.author.id)) {
                    const AdminErrorEmbed = new MessageEmbed()
                        .setTitle(config["title"].error)
                        .setDescription(`\`\`\`${error}\`\`\``)
                        .setColor(`#${config["color"].error}`);
                    message.channel.send({ embeds: [AdminErrorEmbed] });
                    console.log(`${LOG["SYSTEM"].ERROR} - ${error}`);
                    return;
                } else {
                    const RegularErrorEmbed = new MessageEmbed()
                        .setTitle(config["title"].error)
                        .setDescription(`\`\`\`Either the id you've provided is incorrect, or the user does not have dms open, or there has been an error in the Discord API\`\`\``)
                        .setColor(`#${config["color"].error}`);
                    message.channel.send({ embeds: [RegularErrorEmbed] });
                    console.log(`${LOG["SYSTEM"].ERROR} - ${error}`);
                    return;
                };
            });
        };
    }
} as ICommand;