import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import * as data from "../../../package.json"
import moment from "moment"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Displays the server information",
    aliases: ["server"],

    slash: false,

    ownerOnly: false,
    testOnly: false,

    callback: ({ message, client }) => {

        function moment(createdTimestamp: number) {
            throw new Error("Function not implemented.");
        };

        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };

        const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydeny: 'Sydeny',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
        };

        const roles = message.guild?.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const guild = client.guilds.cache.get(config.tourneys_id);
        const channels = message.guild?.channels.cache;
        const emojis = message.guild?.emojis.cache;

        var memberCount = guild?.memberCount;
        const embed = new MessageEmbed()
            .setColor(`#${config["color"].default}`)
            //.setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addFields(
                { name: `__**Server name**__`, value: `>  - **${message.guild?.name}**`, inline: false },
                { name: `__**Members**__`, value: `> - **${memberCount}**`, inline: false },
                { name: `__**Emojis**__`, value: `>  - **${emojis?.size}**`, inline: false },
                //{ name: `__**Creation date**__`, value: `> - **${moment(message.guild?.createdTimestamp).format('LT')} ${moment(message.guild?.createdTimestamp).format('LL')} [${moment(message.guild?.createdTimestamp).fromNow()}**`, inline: false },
                //{ name: `__**Region**__`, value: `>  - ${regions[message.guild?.region], inline: false },
                { name: `__**Boosts**__`, value: `>  - **${message.guild?.premiumSubscriptionCount || '0'}**`, inline: false },
                //{ name: `__**Verification level**__`, value: `>  - ${verificationLevels[message.guild?.verificationLevel]}`, inline: false },
                //{ name: `__****__`, value: `>  - `, inline: false },
                
            )
            .setFooter("More features will be added in the future, this is temporary lol");
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