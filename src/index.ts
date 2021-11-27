import DiscordJS, { Client, Collection, Guild, GuildManager, Channel, Intents, Message, MessageEmbed, TextChannel } from "discord.js"
import WOKCommands from "wokcommands"
import path from "path"
import testSchema from "./test-schema"
import fs from "fs"
import moment from "moment"
import * as config from "./config.json"
import * as custom from "./headers/custom.json"
import LOG_TAGS from "./headers/logs"
const LOG = new LOG_TAGS();
import "dotenv/config"
const { AntiAltClient } = require("discord-antialts") // importing won't work on this package for some reason

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
        "USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"
    ]
});

const commands: Array<string> = [];

client.on('ready', async (client) => {
    client.user?.setActivity(`for ${config.prefix}help`, { type: "WATCHING" });
    console.log(`${LOG.CLIENT_INFO} - Bot preconfigurations have been set`);

    const logchannel: TextChannel = client.channels.cache.get(config["channel"].log) as TextChannel;
    const ReadyEmbed = new MessageEmbed()
        .setDescription(`**Tourneys bot is now online :white_check_mark:**`)
        .setColor(`#${config["color"].success}`)
    await logchannel.send({ embeds: [ReadyEmbed] });

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
                Absolute = Absolute.replace("src/commands/utility/", "");
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
    let dmchannel: TextChannel = client.channels.cache.get(config["channel"].dm) as TextChannel;
    let cmdchannel: TextChannel = client.channels.cache.get(config["channel"].cmd) as TextChannel;

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
            await dmchannel.send({ embeds: [DMembed] });
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
        await cmdchannel.send({ embeds: [BlacklistLogEmbed]});
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
        await cmdchannel.send({ embeds: [CommandEmbed] });
    }
});

client.on('messageDelete', async (message) => {
    const fetchedLogs = await message.guild?.fetchAuditLogs({
        limit: 6,
        type: 'MESSAGE_DELETE'
    }).catch(console.error);
    // https://stackoverflow.com/questions/53328061/finding-who-deleted-the-message
});

const c = new AntiAltClient({
    debug: false,
    altDays: 1,
});

client.on("guildMemberAdd", (member) => {
    c.init(member, {
        action: "kick",
    });
});

c.on("altAction", async (member: { user: { displayAvatarURL: (arg0: { dynamic: boolean }) =>
any; username: any; id: any }; guild: { memberCount: any } }, date: { createdAt: any; createdAtDate: any; joinAt: any }, action: any) => {
    let modchannel: TextChannel = client.channels.cache.get(config["channel"].mod) as TextChannel;
    const AltAlertEmbed = new MessageEmbed()
        .setTitle(`${config["title"].alert}`)
        .setColor(`#${config["color"].alert}`)
        .setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
        .addFields(
            { name: "**__Alt Name__**", value: ` - ${member.user} (${member.user.username})`, inline: true },
            { name: "**__ID__**", value: ` - ${member.user.id}`, inline: true },
            { name: "**__Account Created__**", value: ` - ${date.createdAt} days ago`, inline: true },
            { name: "**__Account Creation Date__**", value: ` - ${date.createdAtDate}`, inline: true },
            { name: "**__Join Position__**", value: ` - ${member.guild.memberCount}`, inline: true },
            { name: "**__Join Date__**", value: ` - ${date.joinAt}`, inline: true }
        )
    await modchannel.send({ embeds: [AltAlertEmbed] })
});


client.on("guildMembersChunk", async (members, guild) => {
    console.error(`a chunk of guild members is received`);
    let modchannel: TextChannel = client.channels.cache.get(config["channel"].mod) as TextChannel;
    const RaidAlertEmbed = new MessageEmbed()
        .setTitle(`${config["title"].raid_alert}`)
        .setColor(`#${config["color"].alert}`)
        .setDescription(`\`\`\`A raid is potentially happening, this alert was triggered due to many members in the same mutual server joining at the same time. The mutual server the raid is suspected to be its main base of operation is called ${guild}. If this was a false alarm, ignore this alert.\`\`\``)
    await modchannel.send({ embeds: [RaidAlertEmbed] }).then(() => {
        modchannel.send(`^^^^ <@${config["list"].admin[0]}>
<@${config["list"].admin[0]}>
<@${config["list"].admin[1]}>
<@${config["list"].admin[2]}>
<@${config["list"].admin[3]}>
<@${config["list"].admin[4]}>
<@${config["list"].admin[5]}>
<@${config["list"].admin[6]}>
<@${config["list"].admin[7]}>
<@351023689581461519> ^^^^`)
    })
});

client.on("guildUnavailable", async (guild) => {
    let modchannel: TextChannel = client.channels.cache.get(config["channel"].mod) as TextChannel;
    const ServerWarnEmbed = new MessageEmbed()
        .setTitle(`${config["title"].serverwarn}`)
        .setColor(`#${config["color"].serverwarn}`)
        .setDescription(`\`\`\`${guild} is currently unavaible due to a server outage. \`\`\``)
    await modchannel.send({ embeds: [ServerWarnEmbed] })
});

client.on("warn", async (warning) => {
    console.log(`${LOG.SYSTEM_WARNING} - ${warning}`);
    let logchannel: TextChannel = client.channels.cache.get(config["channel"].log) as TextChannel;
    const BotWarnEmbed = new MessageEmbed()
        .setTitle(`${config["title"].warn}`)
        .setColor(`#${config["color"].warn}`)
        .setDescription(`\`\`\`${warning}\`\`\``)
    await logchannel.send({ embeds: [BotWarnEmbed] })
});

client.on("error", async (error) => {
    console.error(`client's WebSocket encountered a connection error: ${error}`);
    let logchannel: TextChannel = client.channels.cache.get(config["channel"].log) as TextChannel;
    const BotErrorEmbed = new MessageEmbed()
        .setTitle(`${config["title"].error}`)
        .setColor(`#${config["color"].error}`)
        .setDescription(`\`\`\`The client has encountered a websocket error: \n${error}\`\`\``)
    await logchannel.send({ embeds: [BotErrorEmbed] })
});

/*
client.on("debug", async (debug) => {
    let logchannel: TextChannel = client.channels.cache.get(config["channel"].log) as TextChannel;
    const DebugEmbed = new MessageEmbed()
        .setTitle(`${config["title"].warn}`)
        .setColor(`#${config["color"].warn}`)
        .setDescription(`\`\`\`${debug}\`\`\``)
    await logchannel.send({ embeds: [DebugEmbed] })
});
*/

client.once('reconnecting', () => {
    console.log(`${LOG.CLIENT_INFO} - Client is reconnecting...`);
});

client.once('disconnect', () => {
    console.log(`${LOG.CLIENT_INFO} - Client has disconnected`);
});

client.login(process.env.TOKEN).then(() => {
    console.log(`\n${LOG.SYSTEM_SUCCESS} - Logged into ${client.user?.tag}\n`);
});

/*
process.on('unhandledRejection', (reason) => {
    let logstuff: TextChannel = client.channels.cache.get(config["channel"].log) as TextChannel;
    console.log(LOG.SYSTEM_ERROR + " - " + reason);
    const UnhandledRejection = new MessageEmbed()
        .setTitle(`${config["title"].error}`)
        .setColor(`#${config["color"].error}`)
        .setDescription(`\`\`\`${reason}\`\`\``)
    logstuff.send({ embeds: [UnhandledRejection] })
});
*/