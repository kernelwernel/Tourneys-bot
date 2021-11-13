import { ICommand } from "wokcommands";

export default {
    category: "Admin",
    description: "Just a simple test command to see if the bot works",
    
    slash: false,
    
    permissions: ["ADMINISTRATOR"],
    ownerOnly: true,
    testOnly: true,

    callback: ({ message }) => {
        message.reply(":trollgod:")
    }
} as ICommand
