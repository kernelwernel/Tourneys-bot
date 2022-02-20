import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "General",
    description: "Displays a menu of the command list and categories",
    aliases: ["raid"],

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: async ({ message, args }) => {

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        try {
            const t = {
                c: "\`\`\`", // c => codeblock

                t1: "┌─[ Starting nuke...\n└┬────> GET RAIDED LMFAOOOOOOOO\n │",
                t2: " ├┬─> Banning all members...",
                t3: " ├┬─> Deleting all channels...",
                t4: " ├┬─> Deleting all emojis...",
                t5: " ├┬─> Changing guild icon...",
                t6: " ├┬─> Changing guild name...",
                t7: " ├┬─> Leaving server...",

                d: " │└───> Done!",
                t8: " └──> Nuke completed!"
            }

            // Nuke intro
            const nuke = new MessageEmbed()
                .setColor(`#${config["color"].error}`)
                .setDescription(`${t.c}${t.t1}${t.c}`)
            message.channel.send({embeds: [nuke]}).then(msg => {

            sleep(10000)

            const nuke2 = new MessageEmbed()
                .setDescription(`${t.c}${t.t1}\n${t.t2}${t.c}`)
            msg.edit({embeds: [nuke2]}).then(done => {

            sleep(10000)

            const nukelol = new MessageEmbed()
                .setDescription(`${t.c}${t.t1}\n${t.t2}\n${t.d}${t.c}`)
            done.edit({embeds: [nukelol]}).then(async msg2 => {

            await sleep(10000)

            const nuke3 = new MessageEmbed()
                .setDescription(`${t.c}${t.t1}\n${t.t2}\n${t.d}\n${t.t3}${t.c}`)
            msg2.edit({embeds: [nuke3]}).then(msg3 => {

            await sleep(10000)

            const nuke4 = new MessageEmbed()
                .setDescription(`${t.c}${t.t1}\n${t.t2}\n${t.d}\n${t.t3}\n${t.d}${t.c}`)
            done.edit({embeds: [nuke4]}).then(msg3 => {

            const nuke5 = new MessageEmbed()
                .setDescription(`${t.c}${t.t1}\n${t.t2}\n${t.d}\n${t.t3}\n${t.d}\n${t.t4}${t.c}`)
            msg3.edit({embeds: [nuke5]}).then(done => {
                                    
            const nuke6 = new MessageEmbed()
                .setDescription(`${t.c}${t.t1}\n${t.t2}\n${t.d}\n${t.t3}\n${t.d}\n${t.t4}\n${t.d}${t.c}`)
            done.edit({embeds: [nuke6]}).then(msg4 => {

            const nuke7 = new MessageEmbed()
                .setDescription(`${t.c}${t.t1}\n${t.t2}\n${t.d}\n${t.t3}\n${t.d}\n${t.t4}\n${t.d}\n${t.t5}${t.c}`)
            msg4.edit({embeds: [nuke7]}).then(done => {
                                    
            const nuke8 = new MessageEmbed()
                .setDescription(`${t.c}${t.t1}\n${t.t2}\n${t.d}\n${t.t3}\n${t.d}\n${t.t4}\n${t.d}\n${t.t5}\n${t.d}${t.c}`)
            done.edit({embeds: [nuke8]}).then(msg5 => {

            const nuke9 = new MessageEmbed()
                .setDescription(`${t.c}${t.t1}\n${t.t2}\n${t.d}\n${t.t3}\n${t.d}\n${t.t4}\n${t.d}\n${t.t5}\n${t.d}\n${t.t6}${t.c}`)
            msg5.edit({embeds: [nuke9]}).then(done => {

            const nuke10 = new MessageEmbed()
                .setDescription(`${t.c}${t.t1}\n${t.t2}\n${t.d}\n${t.t3}\n${t.d}\n${t.t4}\n${t.d}\n${t.t5}\n${t.d}\n${t.t6}\n${t.d}${t.c}`)
            done.edit({embeds: [nuke10]}).then(msg6 => {

            const nuke11 = new MessageEmbed()
                .setDescription(`${t.c}${t.t1}\n${t.t2}\n${t.d}\n${t.t3}\n${t.d}\n${t.t4}\n${t.d}\n${t.t5}\n${t.d}\n${t.t6}\n${t.d}\n${t.t7}${t.c}`)
            msg6.edit({embeds: [nuke11]}).then(done => {

            const nuke12 = new MessageEmbed()
                .setDescription(`${t.c}${t.t1}\n${t.t2}\n${t.d}\n${t.t3}\n${t.d}\n${t.t4}\n${t.d}\n${t.t5}\n${t.d}\n${t.t6}\n${t.d}\n${t.t7}\n${t.d}${t.c}`)
            done.edit({embeds: [nuke12]}).then(msg7 => {

            const nuke13 = new MessageEmbed()
                .setDescription(`${t.c}${t.t1}\n${t.t2}\n${t.d}\n${t.t3}\n${t.d}\n${t.t4}\n${t.d}\n${t.t5}\n${t.d}\n${t.t6}\n${t.d}\n${t.t7}\n${t.d}\n |\n${t.t8}${t.c}`)
            msg7.edit({embeds: [nuke13]})
                                        
            })})
            })})
            })})
            })})
            })})
            })
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
}
