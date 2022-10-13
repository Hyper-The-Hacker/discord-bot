const { glob } = require('glob');
const { Client } = require('discord.js');
const mongoose = require('mongoose');
const { promisify } = require("util");
const globPromise = promisify(glob);
const colours = require("console-colors.js").default;
const commmandrunner = require('../json/command/commandrunner.json')

/**
 * @param {Client} client
 */

module.exports = async (client) => {
    if (commmandrunner.MessageCommandEnable === true) {
        const commandFiles = await globPromise(`${process.cwd().replace(/\\/g, "/")}/MessageCommand/**/*.js`);
        commandFiles.map((value) => {
            const file = require(value);
            const splitted = value.split("/");
            const directory = splitted[splitted.length - 2];
            if (file.name) {
                const properties = { directory, ...file };
                client.MessageCommands.set(file.name, properties);
            }
        })
    }
    
    const eventFiles = await globPromise(`${process.cwd().replace(/\\/g, "/")}/events/*.js`);
    eventFiles.map((value) => require(value));
    
    const CollectionFiles = await globPromise(`${process.cwd().replace(/\\/g, "/")}/Collection/*.js`);
    CollectionFiles.map((value) => require(value));

    if (commmandrunner.SlashCommandEnable === true) {
        const slashCommands = await globPromise(`${process.cwd().replace(/\\/g, "/")}/SlashCommand/**/*.js`);
        const arrayOfSlashCommands = [];
        slashCommands.map((value) => {
            const file = require(value);
            if (!file?.name) return;
            client.SlashCommands.set(file.name, file);
            if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
            arrayOfSlashCommands.push(file)
        })
        client.on("ready", async () => {
            await client.application.commands.set(arrayOfSlashCommands);
        });
    }

    const { mongodb } = require('../json/secrets/config.json')
    if (!mongodb) return;
    mongoose.connect(mongodb).then(() => console.log(`${colours.green("[MONGO DB] ------------=====------------")}\n${colours.green("[MONGO DB]")} Connected\n${colours.green("[MONGO DB] ------------=====------------")}`));
}
