import { ICommand } from "wokcommands";

export default {
    category: "kill",
    description: "Terminates the bot process",
    permissions: ["ADMINISTRATOR"],

    callback: ({ message, client }) => {
        message.channel.send("Shutting down the bot...")
        process.exit(1);
    }
} as ICommand