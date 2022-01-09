import { MessageEmbed, TextChannel } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Spams the DM of any user id in the server",
    
    slash: false,
    cooldown: "5s",
    
    ownerOnly: false,
    testOnly: true,

    callback: ({ message, client, args }) => {

        function delay(ms: number) {
            return new Promise( resolve => setTimeout(resolve, ms) );
        }

        function ErrorEmbed(msg: string) {
            const IncorrectEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${msg}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [IncorrectEmbed] })
            return;
        }

        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
            console.log(`${LOG.CLIENT_COMMAND} ${message.author.tag} - ${message.content}`);
            let cmdchannel: TextChannel = client.channels.cache.get(config["channels"].cmd) as TextChannel;
            const CommandEmbed = new MessageEmbed()
                .setColor(`#${config["color"].discord}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                .setDescription(`**Command executed:**\`\`\`${message.content}\`\`\``);
            cmdchannel.send({ embeds: [CommandEmbed] });
    
            let SendID = args.shift()!;
            let SnowflakeIsValid: boolean = false
            let SpamMessage: string
            let DefaultSpam: boolean
            let SpamType: string | undefined

            switch (SendID.length) {
                case 18:
                    SnowflakeIsValid = true
                    if (!args) {
                        return ErrorEmbed(`Please enter an ID as your argument!\nUsage:\n ;spam <id> [message]`)
                    } else if (args.length == 0) {
                        SpamType = `gay thug porn`
                        SpamMessage = `https://cdn.discordapp.com/attachments/909224884939419708/919652071253348362/Snapchat-914193569.mp4`
                        DefaultSpam = true
                    } else if (args.length >= 1) {
                        SpamType = `a custom message`
                        SpamMessage = `${args.join(" ")}`
                    } else {
                        return ErrorEmbed(`There has been an error with the client, please notify the bot developer to report this issue.`)
                    }

                    const embed = new MessageEmbed()
                        .setDescription(`**Currently spamming <@${SendID}>'s dms with ${SpamType} <:trollgod:855435721624256542>**`)
                        .setColor(`#${config["color"].default}`);
                    message.channel.send({ embeds: [embed] })
                    client.users.fetch(`${SendID}`).then(async (user: { send: (arg0: string) => void }) => {
                        while (true) {
                            user.send(`${SpamMessage}`)
                            await delay(100);
                        }
                    })
                    break;
                default:
                    return ErrorEmbed(`Invalid argument! Please try again.\nCorrect usage:\n ;spam <id> [message]`)
            }
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
