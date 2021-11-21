import DiscordJS, { Client, Collection, Guild, GuildManager, Channel, Intents, Message, MessageEmbed, TextChannel } from "discord.js"
import WOKCommands from "wokcommands"
import path from "path"
import testSchema from "./test-schema"
import fs from "fs"
import editJsonFile from "edit-json-file"

import * as config from "./config.json"
import * as custom from "./headers/custom.json"
import LOG_TAGS from "./headers/logs"
const LOG = new LOG_TAGS();
import "dotenv/config"

let commands: Array<string> = [];

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.DIRECT_MESSAGES,
    ],
    partials: [
        "USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE"
    ]
});

client.on('ready', async (client) => {
    client.user?.setActivity(`for ${config.prefix}help`, { type: "WATCHING" });
    console.log(`${LOG.CLIENT_INFO} - Bot preconfigurations have been set`);

    const embed = new MessageEmbed()
    .setDescription(`**Tourneys bot is now online :white_check_mark:**`)
    .setColor(`#${config["color"].success}`)

    const channel: TextChannel = client.channels.cache.get(config.startchannel) as TextChannel;
    await channel.send({ embeds: [embed] });

    function ThroughDirectory(directory: string) {
        fs.readdirSync(directory).forEach(file => {
            let Absolute = path.join(directory, file);
            if (fs.statSync(Absolute).isDirectory()) {
                return ThroughDirectory(Absolute);
            } else {
                Absolute = Absolute.replace(".ts", "");
                Absolute = Absolute.replace("src/commands/admin/", "");
                Absolute = Absolute.replace("src/commands/general/", "");
                Absolute = Absolute.replace("src/commands/assassin/", "");
                return commands.push(Absolute);
            }
        });
    }
    
    ThroughDirectory("./src/commands/");

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        // featuresDir: path.join(__dirname, 'features'),
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
          //"351023689581461519", // TheRealMMR#0001 <= cringe as fuck
            "270325321419587604", // reknT#6594
        ],
        mongoUri: process.env.MONGO_URI,
        dbOptions: {
            keepAlive: true
        },
        defaultLanguage: 'english',
        ignoreBots: false,
        ephemeral: true,
        disabledDefaultCommands: [
            'help', 'command', 'prefix', 'language', 'requiredrole'
        ],
        debug: true
    })
    .setDefaultPrefix(config.prefix)
    .setColor(config["color"].default);

    setTimeout(async () => {
        await new testSchema({
            message: "testing",
        }).save()
    }, 1000);
});

client.on('messageCreate', async (message) => {
    if (message.content == custom.trigger) {
        message.channel.send(custom.text)
    }

    if (message.channel.type === 'DM' && !message.author.bot) {
        if (message.content.length <= 1250) {
            console.log(`${LOG.CLIENT_DM} ${message.author.tag} - ${message.content}`);
        }
    }

    if (config["list"].blacklisted.includes(message.author.id)) {
        const embed = new MessageEmbed()
            .setColor(`#${config["color"].blacklisted}`)
            .setDescription(`**Lol ${String.fromCharCode(110, 105, 103, 103, 97)} ur blacklisted**`);
        message.channel.send({ embeds: [embed]});
        return;
    }

    if (!message.content.startsWith(config.prefix) || message.author.bot) {
        return;
    }

    if (commands.includes(message.content.slice(1, message.content.length))) {
        console.log(`${LOG.CLIENT_COMMAND} ${message.author.tag} - ${message.content}`);
    }
});

client.on('messageDelete', async (message) => {
    const fetchedLogs = await message.guild?.fetchAuditLogs({
        limit: 6,
        type: 'MESSAGE_DELETE'
    }).catch(console.error);
    // https://stackoverflow.com/questions/53328061/finding-who-deleted-the-message
});

client.once('reconnecting', () => {
    console.log(`${LOG.CLIENT_INFO} - Client is reconnecting...`);
});

client.once('disconnect', () => {
    console.log(`${LOG.CLIENT_INFO} - Client has disconnected`);
});

client.login(process.env.TOKEN).then(() => {
    console.log(`\n${LOG.SYSTEM_SUCCESS} - Logged into ${client.user?.tag}\n`);
});

client.on("warn", (info) => {
    console.log(info)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log(LOG.SYSTEM_ERROR + " - " + reason);
    process.exit(1);
});