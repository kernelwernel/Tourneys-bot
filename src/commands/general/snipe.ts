import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()


export default {
    category: "General",
    description: "snipe command",

    slash: false,

    ownerOnly: false,
    testOnly: false,

    callback: ({ message, client, interaction, text }) => {
        // TODO: add the snipe command functionality


/*
        .catch((error) =>{
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`)
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
            return;
        });
*/
    }
} as ICommand;
