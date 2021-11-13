import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import mongoose from 'mongoose'
import testSchema from './test-schema'
import 'dotenv/config'

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES,
    ],
});

client.on('ready', async () => {

    await mongoose.connect(
        process.env.MONGO_URI || "", {
            keepAlive: true,
        }
    )

    client.user?.setActivity("test", { type: "LISTENING"})

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: [
            "747913617344561194", // Personal server
            "688510763387715649", // Tourneys
        ],
        botOwners: [
            "699310549573435423", // nonce#7570
            "299876224233373698", // dylаn#1111

            "768666879308202006", // spirals#1375
            "683467496845606980", // domm#0007
            "593985080284676156", // Huzaifa#0001
            "351023689581461519", // TheRealMMR#0001 <= (cringe as fuck)
        ],
        //mongoUri: process.env.MONGO_URI,
    })

    setTimeout(async () => {
        await new testSchema({
            message: "testing",
        }).save()
    }, 1000)
    
});

client.on('messageCreate', (message) => {
    if (!message.content.startsWith('!') || message.author.bot) {
        return;
    }
});

client.on('messageDelete', async () => {
    console.log("message deleted")
});

client.login(process.env.TOKEN).then(() => {
    console.log(`\n\t\u001b[92;40m[SYSTEM]\u001b[0m::\u001b[92m[SUCCESS]\u001b[0m Logged into ${client.user?.tag}\n`);
});