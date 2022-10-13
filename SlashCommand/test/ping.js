const { Client, CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: ApplicationCommandType.ChatInput,
    timeout: 50000,
    clientPermissions: [],
    userPermissions: [],
    about: '',
    usage: '',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.editReply({ content: `pong ${client.ws.ping}`})
    },
};
