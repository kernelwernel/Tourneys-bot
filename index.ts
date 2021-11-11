import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ],
})

client.on('ready', () => {
    console.log(`\n[SYSTEM]::Logged into ${client.user?.tag}\n`)

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: ["747913617344561194"],
        botOwners: ["699310549573435423"]
    })
})

client.login(process.env.TOKEN)