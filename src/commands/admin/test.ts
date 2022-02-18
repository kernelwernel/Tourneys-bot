import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()
const Gen = require("sentence-generator")
const gen = Gen('src/phrase_template.txt')
const fs = require('fs');

export default {
    category: "Admin",
    description: "Just a simple test command to see if the bot works",
    
    slash: false,
    cooldown: "5s",
    
    ownerOnly: false,
    testOnly: true,

    callback: ({ message, client }) => {
        try {
            /*
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
            //const c = gen.generate()
            const c = gen.take(4)
            message.channel.send(`${c}`)
            



            
            var readline = require('linebyline'),
            rl = readline('src/phrase_template.txt')

            var phrases: Array<string> = [];
            
            rl.on('line', function(line: string) {
                phrases.push(`${line}`)
                //console.log(line)
            })

            console.log(phrases);
            */              

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