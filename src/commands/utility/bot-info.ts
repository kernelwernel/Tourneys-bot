import { MessageEmbed, Client } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../../config.json"
import * as npm from "../../../package.json"
import axios from "axios"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()

export default {
    category: "Utility",
    description: "Displays the bot's information",
    aliases: ["botinfo", "bot"],
    
    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: async ({ client, message }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
            let totalSeconds = (client.uptime! / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);

            const uri = "https://api.github.com/repos/Existential-nonce/Tourneys-bot/languages"
            const { data } = await axios.get(uri)
            let total: number = data.TypeScript + data.Shell + data.Makefile + data.Dockerfile
            const langs = {
                ts: (Math.round((data.TypeScript / total) * 100 * 10) / 10),
                shell: (Math.round((data.Shell / total) * 100 * 10) / 10),
                make: (Math.round((data.Makefile / total) * 100 * 10) / 10),
                docker: (Math.round((data.Dockerfile / total) * 100 * 10) / 10)
            }

            var ids = [{
                "nonce": "699310549573435423", 
                "dillon": "841058819848536085",
                "threat": "905599023199682650",
                "darsh": "823402171562459177"
            }]

            let contributors: Array<string> | undefined = [
                `${ids[0]["nonce"]}`, 
                `${ids[0]["dillon"]}`,
                `${ids[0]["threat"]}`,
                `${ids[0]["darsh"]}`
            ];

            // I'm fully aware that there's better ways to do this smh
            let user0 = await client.users.fetch(contributors[0], { cache: true });
            let user1 = await client.users.fetch(contributors[1], { cache: true });
            let user2 = await client.users.fetch(contributors[2], { cache: true });
            let user3 = await client.users.fetch(contributors[3], { cache: true });

            const embed = new MessageEmbed()
                .setColor(`#${config["color"].default}`)
                .addFields(
                    { name: `__**Bot version**__`, value: `> 🏷 - **${config.version}**`, inline: false },
                    { name: `__**Bot uptime**__`, value: `> ⏲ - **${days} days, ${hours} hours, ${minutes} minutes**`},
                    { name: `__**Discord.js version**__`, value: `> <:djs:909502528490725446> - **v${npm.dependencies["discord.js"].substring(1)}**`, inline: false },
                    { name: `__**Discord.js API latency**__`, value: `> 📡 - **${Math.round(client.ws.ping)}ms**`, inline: false },
                    { name: `__**Languages used**__`, value:`>>> <:Typescript:909503375433928764> - **TypeScript**  \`${langs.ts}%\`
<:bash:912487277446455307> - **Shell**  \`${langs.shell}%\`
<:makefile:912488405106049075> - **Makefile**  \`${langs.make}%\`
<:docker:910267595045883914> - **Dockerfile**  \`${langs.docker}%\``, inline: false },
                    { name: "__**Tourneys bot source code:**__", value: `> <:github:798841111338680330> - **${config.repo_link}**`, inline: false },
                    { name: "__**Docker container:**__", value: "> <:docker:910267595045883914> - **https://hub.docker.com/r/nonce1/tourneys-bot**", inline: false },
                    { name: `__**Credits**__`, value: `>>> <:777964368717414410:798168215020109895> - **${user0.username}#${user0.discriminator}**
<:BugHunter:799700882404147242> - **${user1.username}#${user1.discriminator}**
<:BugHunter:799700882404147242> - **${user2.username}#${user2.discriminator}** 
<:BugHunter:799700882404147242> - **${user3.username}#${user3.discriminator}**`, inline: false },
                );
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
        };
    }
} as ICommand;