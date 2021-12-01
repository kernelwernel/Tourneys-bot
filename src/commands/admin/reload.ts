import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import glob from "glob"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Admin",
    description: "Reloads all the commands and .ts files of the bot",
    aliases: ["refresh", "reboot"],

    slash: false,
    cooldown: "5s",
    
    permissions: ["MANAGE_GUILD"],
    ownerOnly: true,
    testOnly: true,

    callback: async ({ message, client }) => {
        if (config["list"].blacklisted.includes(message.author.id)) { return; }
        console.log(`${LOG.SYSTEM_RELOADING}`);

        client.user?.setActivity(`for ${config.prefix}help`, { type: "WATCHING" });
        
        const embed = new MessageEmbed()
            .setTitle(`🛠 Admin panel 🛠`)
            .setDescription(`\`\`\`> Commands have been reloaded\`\`\``)
            .setColor(`#${config["color"].admin}`);
            glob(`${__dirname}/../**/*.ts`, async (err, filePaths) => {
                filePaths.forEach((file) => {
                    delete require.cache[require.resolve(file)];
                })
            })
        const newMessage = await message.channel.send({
            embeds: [embed]
        })

        const newEmbed = newMessage.embeds[0];
        newEmbed.setDescription("\`\`\`> Commands have been reloaded\n> Bot configurations have been reloaded\`\`\`");
        newMessage.edit({
            embeds: [newEmbed]
        })

        try { } catch (error) {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
            return;
        };

        console.log(`${LOG.SYSTEM_RELOADED}`);
    }
} as ICommand;
