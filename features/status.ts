import { text } from "stream/consumers";
import { ICommand } from "wokcommands";

export default {
    category: "Configuration",
    description: "Sets the bots status",

    minArgs: 1,
    expectedArgs: "<status>",
    slash: "both",
    ownerOnly: true,

    callback: ({ client, text }) => {
        client.user?.setPresence({
            status: "dnd",
            activities: [
                {
                    name: text
                }
            ]
        })
        return "Status updated"
    }
} as ICommand