const { Client, CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "eg",
    description: "returns websocket ping",
    type: ApplicationCommandType.ChatInput,
    timeout: 0,
    clientPermissions: [],
    userPermissions: [],
    about: '',
    usage: '',
    options: [
        {
            name: 'eg',
            description: 'eg',
            type: ApplicationCommandOptionType.String,
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        
    },
};
