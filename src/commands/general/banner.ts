import { Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import { client } from "../../index"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()
const { DiscordBanners } = require('discord-banners');
const discordBanners = new DiscordBanners(client);
var discordid = require('discord-get');

export default {
    category: "General",
    description: "snipes an edit",

    slash: false,

    ownerOnly: false,
    testOnly: true,

    callback: async ({ message, channel, args }) => {
        function ErrorEmbed(argument: string) {
            const IncorrectEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${argument}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [IncorrectEmbed] }).then(() => {
                message.delete()
            })
            return;
        }

        try {
            let banner: any;
            if (args.length == 0) { banner = await discordBanners.getBanner(message.author.id, { size: 2048, format: "png", dynamic: true }) } 
            else if (args.length == 1) {
                var mention: Array<any> = discordid.mention(`${args[0]}`)
                banner = await discordBanners.getBanner(mention[0], { size: 2048, format: "png", dynamic: true }) 
            }
            console.log(banner)
            if (banner) {
                const BannerEmbed = new MessageEmbed()
                .setColor(`#${config["color"].default}`)
                .setImage(`${banner}`)
                message.channel.send({ embeds: [BannerEmbed] });
            }
            else if(!banner) { ErrorEmbed("Invalid user or banner") }
        } catch (error) {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`)
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
            return;
        };
    }
} as ICommand;


function processA() {}
function processB() {}
function processC() {}
var condition = null;




if (condition == true) {
    processA()
    processB()
    processC()
}



