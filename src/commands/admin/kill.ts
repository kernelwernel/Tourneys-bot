import { ICommand } from "wokcommands"
import { MessageEmbed } from "discord.js"
import * as config from "../../config.json"
import LOG from "../../headers/logs.json"
/*
import Heroku from 'heroku-client'
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
*/

export default {
    category: "Admin",
    description: "Terminates the bot process",
    aliases: ["exit", "abort", "terminate", "shutdown"],

    slash: false,

    minArgs: 1,
    expectedArgs: "<type>",
    
    permissions: ["ADMINISTRATOR"],
    ownerOnly: true,
    testOnly: true,

    callback: async ({ message, client, text }) => {

        let shutdown: string = "";
        let local: boolean = false;
        let server: boolean = false;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        function InvalidEmbed(err_msg) {
            const InvalidEmbed = new MessageEmbed()
                .setTitle(config["title"].admin)
                .setDescription(`\`\`\`> ${err_msg}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [InvalidEmbed] });
            return;
        }

        if (!args) {
            InvalidEmbed("Please enter a valid argument. Usage:\n ;kill <local | server>")
        }
        
        switch (args[1]) {
            case ("local"):
                shutdown = "locally"
                local = true;
                break;
            case ("server"):
                shutdown = "serverside"
                server = true;
            default:
                return InvalidEmbed("Invalid argument! Please try again");
        }

        const embed = new MessageEmbed()
            .setTitle(config["title"].admin)
            .setDescription(`\`\`\`"Shutting down the ${shutdown} hosted bot..."\`\`\``)
            .setColor(`#${config['color'].admin}`);
        const newMessage = await message.reply({
            embeds: [embed]
        })

        const newEmbed = newMessage.embeds[0];
        newEmbed.setDescription(`\`\`\`> Shutting down the ${shutdown} hosted bot...\n> Bot has been shut down\`\`\``);
        newMessage.edit({
            embeds: [newEmbed]
        }).then(async () => {
            console.log(`${LOG["SYSTEM"].SHUTDOWN} by ${message.author.tag}`);
            client.user?.setStatus('invisible');
            server ? process.kill(process.pid, 'SIGTERM') : process.exit(1)
        }).catch((error) => {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG["SYSTEM"].ERROR} - ${error}`);
        });
    }
} as ICommand;