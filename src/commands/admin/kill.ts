import { ICommand } from "wokcommands"
import { MessageEmbed } from "discord.js"
import * as config from "../../config.json"
import fs from "fs"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Terminates the bot process",
    aliases: ["exit", "abort", "terminate", "shutdown"],

    slash: false,
    cooldown: "5s",
    
    permissions: ["MANAGE_GUILD"],
    ownerOnly: true,
    testOnly: true,

    callback: async ({ message, client, args }) => {
        function InvalidEmbed(err_msg: string) {
            const InvalidEmbed = new MessageEmbed()
                .setTitle(config["title"].admin)
                .setDescription(`\`\`\`> ${err_msg}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [InvalidEmbed] });
            return;
        }

        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }

            if (!args) {
                InvalidEmbed("Please enter a valid argument. Usage:\n ;kill <local | server>")
            }

            let shutdown: string;
            let local: boolean = false;
            let server: boolean = false;

            switch (args[0]) {
                case "locally":
                case "local":
                    shutdown = "locally"
                    local = true;
                    break;
                case "serverside":
                case "server":
                    shutdown = "serverside"
                    server = true;
                    break;
                default:
                    return InvalidEmbed("Invalid argument! Please try again. Usage:\n;kill <local | server>");
            }

            const embed = new MessageEmbed()
                .setTitle(config["title"].admin)
                .setDescription(`\`\`\`The ${shutdown} hosted bot has successfully been shut down\`\`\``)
                .setColor(`#${config['color'].admin}`);
            await message.channel.send({
                embeds: [embed]
            })

            console.log(`${LOG.SYSTEM_SHUTDOWN} by ${message.author.tag}`);
            client.user?.setStatus('invisible');
            server ? process.kill(process.pid, 'SIGTERM') : process.exit(1)

        } catch (error) {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
        };
    }
} as ICommand;