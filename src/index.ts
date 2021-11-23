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

const commands: Array<string> = [];

client.on('ready', async (client) => {
    client.user?.setActivity(`for ${config.prefix}help`, { type: "WATCHING" });
    console.log(`${LOG.CLIENT_INFO} - Bot preconfigurations have been set`);

    const channel: TextChannel = client.channels.cache.get(config["channel"].start) as TextChannel;
    const ReadyEmbed = new MessageEmbed()
        .setDescription(`**Tourneys bot is now online :white_check_mark:**`)
        .setColor(`#${config["color"].success}`)
    await channel.send({ embeds: [ReadyEmbed] });

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
    let logchannel: TextChannel = client.channels.cache.get(config["channel"].log) as TextChannel;
    if (message.content == custom.trigger) {
        message.channel.send(custom.text)
    }

    if (message.channel.type === 'DM' && !message.author.bot) {
        if (message.content.length < 2000) {
            console.log(`${LOG.CLIENT_DM} ${message.author.tag} - ${message.content}`);
            const DMembed = new MessageEmbed()
                .setColor(`#${config["color"].dm}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                .setDescription(`**Received DM:**\`\`\`${message.content}\`\`\``);
            await logchannel.send({ embeds: [DMembed] });
        }
    }

    if (config["list"].blacklisted.includes(message.author.id) && commands.includes(message.content.slice(1, message.content.length))) {
        const BlacklistEmbed = new MessageEmbed()
            .setColor(`#${config["color"].blacklisted}`)
            .setDescription(`**Lol ${String.fromCharCode(110, 105, 103, 103, 97)} ur blacklisted**`);
        message.channel.send({ embeds: [BlacklistEmbed]});
        const BlacklistLogEmbed = new MessageEmbed()
            .setColor(`#${config["color"].blacklisted}`)
            .setDescription(`**Blocked ${message.author.tag} from using the ${message.content} command lol**`);
        logchannel.send({ embeds: [BlacklistLogEmbed]});
        return;
    }

    if (!message.content.startsWith(config.prefix) || message.author.bot) {
        return;
    }

    if (commands.includes(message.content.slice(1, message.content.length))) {
        console.log(`${LOG.CLIENT_COMMAND} ${message.author.tag} - ${message.content}`);
        const CommandEmbed = new MessageEmbed()
            .setColor(`#${config["color"].discord}`)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription(`**Command executed:**\`\`\`${message.content}\`\`\``);
        await logchannel.send({ embeds: [CommandEmbed] });
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

process.on('unhandledRejection', (reason) => {
    let logchannel: TextChannel = client.channels.cache.get(config["channel"].log) as TextChannel;
    console.log(LOG.SYSTEM_ERROR + " - " + reason);
    const UnhandledRejection = new MessageEmbed()
        .setTitle(`${config["title"].error}`)
        .setColor(`#${config["color"].error}`)
        .setDescription(`\`\`\`${reason}\`\`\``)
    logchannel.send({ embeds: [UnhandledRejection] })
});