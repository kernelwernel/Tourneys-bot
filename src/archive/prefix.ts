/*
import { Interaction, MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import * as config from "../config.json"
import LOG_TAGS from "../headers/logs"
const LOG = new LOG_TAGS()
import fs from "fs"
import editJsonFile from "edit-json-file"

export default {
    category: "Admin",
    description: "change the bot's prefix",
    aliases: ["changeprefix", "change-prefix"],

    slash: false,

    minArgs: 1,
    expectedArgs: "<prefix>",

    permissions: ["MANAGE_GUILD"],
    ownerOnly: true,
    testOnly: true,

    callback: ({ message, client, interaction, text }) => {
        let result = JSON.parse(fs.readFileSync('../../config.json', 'utf8'));
        fs.readFile("../../config.json", 'utf8', function readFileCallback(err, data) {
            if (err) {
              console.log(err);
            } else {
              fs.writeFile("../../config.json", JSON.stringify(result), 'utf8', err => {
                if (err) throw err;
                console.log('File has been saved!');
              });
            }
        });
    }
} as ICommand
*/