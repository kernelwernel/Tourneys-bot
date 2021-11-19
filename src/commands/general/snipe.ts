import { text } from "stream/consumers";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()


export default {
    category: "General",
    description: "snipe command",

    slash: false,

    ownerOnly: false,
    testOnly: false,

    callback: ({ message, client, interaction, text }) => {
        // TODO: add the snipe command functionality
    }
} as ICommand
