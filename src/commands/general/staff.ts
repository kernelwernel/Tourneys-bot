import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Displays the mod team",
    aliases: ["mods", "mod"],
    
    slash: false,
    cooldown: "5s",
    
    ownerOnly: false,
    testOnly: true,

    callback: ({ message }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
            const embed = new MessageEmbed()
                .setDescription(`
<@${config["list"]["admin"][2]}> - **The server blackie**

<@${config["list"]["admin"][1]}> - (no description)

<@${config["list"]["admin"][4]}> - **The type of guy who would cum after listening to 2 seconds of juice world's new album**

<@${config["list"]["admin"][3]}> - **The guy with the edgelord hacker pfp**

<@${config["list"]["admin"][0]}> - **The retarded programmer**

<@${config["list"]["admin"][8]}> - **The edater**

<@${config["list"]["admin"][10]}> - **The server sex offender**

<@${config["list"]["admin"][9]}> - **The ultra mega emo**

<@${config["list"]["admin"][5]}> - **The**

<@${config["list"]["admin"][7]}> - **The one who would watch scarlxrd porn**

<@${config["list"]["admin"][6]}> - **The brit**`)
                .setColor(`#${config["color"].default}`);
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