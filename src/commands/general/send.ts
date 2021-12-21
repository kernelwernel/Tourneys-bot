import { MessageEmbed, GuildManager, TextChannel, Message } from "discord.js"
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
    
    ownerOnly: true,
    testOnly: true,

    callback: ({ message, client, args }) => {
        function ErrorEmbed() {
            const IncorrectEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription("\`\`\`> Invalid argument! Please try again.\nCorrect usage:\n ;send <id> <message>\`\`\`")
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [IncorrectEmbed] }).then(() => {
                message.delete()
            })
            return;
        }

        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }

            let SendID: string
            let SnowflakeIsValid: boolean
            let cmdchannel: TextChannel = client.channels.cache.get(config["channel"].cmd) as TextChannel;
            let auditchannel: TextChannel = client.channels.cache.get(config["channel"].audit) as TextChannel;
            const adminchannels = new Array<string>("913948455766990888", "913948495537377330", "909224884939419708", "912004266347081768");
            let noLog: boolean | undefined;

            if (!args.length || args.length == 1) {
                return ErrorEmbed()
            }

            let DMmessage = args.slice(1).join(" ");
            SendID = args.shift()!;
            DMmessage.toString();

            const User = client.users.cache.get(`${SendID}`);
            if (User) {
                SnowflakeIsValid = true
            } else {
                SnowflakeIsValid = false
            };

            if (!SnowflakeIsValid) {
                return ErrorEmbed()
            } else {
                if (SendID == "906274074966253578") {
                    message.channel.send("<:smh:859528238077706240>")
                    return;
                } else {
                    client.users.fetch(`${SendID}`).then((user) => {
                        try { user.send(`${DMmessage}`) } catch { return ErrorEmbed() }

                        if (message.channel.id != `${config["channel"].secret}`) {
                            const SentEmbed = new MessageEmbed()
                                .setDescription(`**Message to <@${SendID}> sent!**`)
                                .setColor(`#${config["color"].default}`);
                            message.channel.send({ embeds: [SentEmbed] })
                            noLog = false
                        } else {
                            noLog = true
                            auditchannel.bulkDelete(1)
                        }

                        if (!adminchannels.includes(message.channel.id)) {
                            message.delete()
                        }
    
                        switch (noLog) {
                            case true:
                                break;
                            case false:
                                console.log(`${LOG.CLIENT_COMMAND} ${message.author.tag} - ${message.content}`);
                                const CommandEmbed = new MessageEmbed()
                                    .setColor(`#${config["color"].discord}`)
                                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                                    .setDescription(`**Command executed:**\`\`\`${message.content}\`\`\``);
                                cmdchannel.send({ embeds: [CommandEmbed] });
                                break;
                            default:
                                return ErrorEmbed()
                        }
                    })
                }
            }
        } catch (error) {
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
                    .setDescription(`\`\`\`Either the id you've provided is incorrect, or the user does not have dms open, or there has been an error in the Discord API\`\`\``)
                    .setColor(`#${config["color"].error}`);
                message.channel.send({ embeds: [RegularErrorEmbed] });
                console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
                return;
            };
        };
    }
} as ICommand;