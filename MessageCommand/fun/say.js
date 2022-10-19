const { Message, Client, EmbedBuilder } = require("discord.js");
const prefix = require('../../json/prefix/PrefixList.json')

module.exports = {
    name: "say",
    aliases: [],
    timeout: 1000,
    clientPermissions: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
    userPermissions: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
    about: 'Gives you response what you written it works like eco',
    usage: `${prefix.DefaultPrefix}say [you want to say]`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      if (!args[0]) return message.channel.send({ content: `Please type something` })
        const sayembed = new EmbedBuilder()
        .setDescription(args.join(" "))
        .setColor("Random")
        message.channel.send({ embeds: [sayembed] });
    },
};
