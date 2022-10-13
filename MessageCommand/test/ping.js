const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["p"],
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
        message.channel.send({ content: `ping ${client.ws.ping}`})
    },
};
