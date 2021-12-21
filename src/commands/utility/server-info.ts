import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Utility",
    description: "Displays the server information",
    aliases: ["server", "serverinfo"],

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: ({ message, client }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }

            const verificationLevels = {
                NONE: 'None',
                LOW: 'Low',
                MEDIUM: 'Medium',
                HIGH: 'High (╯°□°）╯︵ ┻━┻',
                VERY_HIGH: 'Very high ┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
            };

            const roles = message.guild?.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
            const guild = client.guilds.cache.get(config["tourneys"].id);
            const channels = message.guild?.channels.cache;
            const emojis = message.guild?.emojis.cache;

            var memberCount = guild?.memberCount;

            let boostlevel:any;
            let boostcount = message.guild?.premiumSubscriptionCount || "0"
            if (boostcount < 7) { boostlevel = 1}
            else if (boostcount >= 7 && boostcount < 14) { boostlevel = 2 }
            else if (boostcount >= 14) { boostlevel = 3 }
            else { boostlevel = "error"}

            const embed = new MessageEmbed()
                .setColor(`#${config["color"].default}`)
                .setThumbnail(`${message.guild?.iconURL({ dynamic: true })}`)
                .addFields(
                    { name: `__**Server name**__`, value: `> <:TourneysLogo:905736079519416331> - **${message.guild?.name}**`, inline: false },
                    { name: `__**Members**__`, value: `> 👥 - **${memberCount}**`, inline: false },
                    { name: `__**Emojis**__`, value: `> <:dudewhat:752186068832354314> - **${emojis?.size}**`, inline: false },
                    { name: `__**Creation date**__`, value: `> 🗓️ - **${message.guild?.createdAt.toDateString()}**`, inline: false },
                    { name: `__**Boosts**__`, value: `> <a:nitro:912309250104102922> - **${boostcount}**`, inline: false },
                    { name: `__**Boost level**__`, value: `> <:1151nitro:912448526414409739> - **Level ${boostlevel}**`, inline: false },
                    { name: `__**Verification level**__`, value: `> <:7649modshield:912450558395306044> - **High**`}
                )
            message.channel.send({
                embeds: [embed]
            })
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