import DiscordJS, { Client, Collection, Intents, MessageEmbed } from "discord.js"
import WOKCommands from "wokcommands"
import path from "path"
import testSchema from "./test-schema"
import fs from "fs"


import * as config from "./config.json"
import LOG_TAGS from "./logs"
const LOG = new LOG_TAGS()

import "dotenv/config"


const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.DIRECT_MESSAGES,
    ],
    partials: [
        "CHANNEL",
    ]
});

let general_commands: Array<string> = []
let admin_commands: Array<string> = []

fs.readdir("./src/commands/admin", (err, files) => {
    files.forEach(file => {
        file = file.replace(".ts", "")
        admin_commands.push(file)
    });
});

fs.readdir("./src/commands/general", (err, files) => {
    files.forEach(file => {
        file = file.replace(".ts", "")
        general_commands.push(file)
    });
});

client.on('ready', async () => {
    
    client.user?.setActivity(`${config.activity}`, { type: "WATCHING" });

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: [
            "747913617344561194", // Personal server
            "688510763387715649", // Tourneys
        ],
        botOwners: [
            // ===== BOT DEVS =====
            "699310549573435423", // nonce#7570
            "299876224233373698", // dylаn#1111

            // ===== BOT ADMINS =====
            "768666879308202006", // spirals#1375
            "683467496845606980", // domm#0007
            "593985080284676156", // Huzaifa#0001
            "351023689581461519", // TheRealMMR#0001 <= cringe as fuck
            "270325321419587604", // reknT#6594
        ],
        mongoUri: process.env.MONGO_URI,
    })

    setTimeout(async () => {
        await new testSchema({
            message: "testing",
        }).save()
    }, 1000)

    
});

client.on('messageCreate', (message) => {
    if (message.channel.type === 'DM') {
        if (message.content.length <= 1250) {
            console.log(LOG.CLIENT_DM + " " + message.author.tag + " - " + message.content)
        }
    }

    if (!message.content.startsWith(config.prefix) || message.author.bot) {
        return;
    }

    var commands = admin_commands.concat(general_commands)
    var evalcommand = message.content.slice(1, message.content.length)
    if (commands.includes(evalcommand)) {
        console.log(`${LOG.CLIENT_COMMAND} ${message.author.tag} - ${message.content}`)
    }
});

client.on('messageDelete', (message) => {
    
});

client.login(process.env.TOKEN).then(() => {
    console.log(`\n\t${LOG.SYSTEM_SUCCESS} - Logged into ${client.user?.tag}\n`);

    /*
    console.log(LOG.CLIENT_DM)
    console.log(LOG.CLIENT_COMMAND)
    console.log(LOG.SYSTEM_SUCCESS)
    console.log(LOG.SYSTEM_ERROR)
    console.log(LOG.SYSTEM_RELOADING)
    console.log(LOG.SYSTEM_RELOADED)
    */
});

process.on('unhandledRejection', (reason, promise) => {
    console.log(LOG.SYSTEM_ERROR + " - " + reason);
});