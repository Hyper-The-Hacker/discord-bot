const { Message, Client } = require("discord.js");

module.exports = {
    name: "example",
    aliases: ["eg.", "ex"],
    timeout: 0,
    clientPermissions: [],
    userPermissions: [],
    about: '',
    usage: '',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        //add code here
    },
};
