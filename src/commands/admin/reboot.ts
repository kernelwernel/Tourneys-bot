import { ICommand } from "wokcommands"
import { MessageEmbed } from "discord.js"
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Reboots the bot process, used if you wanna stop it from spamming",
    aliases: ["refresh"],

    slash: false,

    ownerOnly: true,
    testOnly: true,

    callback: async ({ message, client }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
            if(!message.member.guild.me.hasPermmission('MANAGE_GUILD')) {
                if (message.author.id != 943610576490348614) { InvalidEmbed("This command is only reserved for admins"); }
            }

            const embed = new MessageEmbed()
                .setTitle(config["title"].admin)
                .setDescription(`\`\`\`The bot is rebooting, this may take a few seconds...\`\`\``)
                .setColor(`#${config['color'].admin}`);
            await message.channel.send({
                embeds: [embed]
            })

            console.log(`${LOG.SYSTEM_REBOOTING} by ${message.author.tag}`);
            client.user?.setStatus('invisible');
            process.exit(1)
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
