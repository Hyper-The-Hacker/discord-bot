const { Client, CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const math = require('mathjs');
const color = require('../../json/color/default.json');
const pingchecks = require('../../schemas/pingchecks');
const prefix = require('../../json/prefix/PrefixList.json');

module.exports = {
    name: "ping",
    description: "Gives My Ping",
    type: ApplicationCommandType.ChatInput,
    timeout: 5000,
    clientPermissions: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
    userPermissions: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
    about: 'Check My Ping!',
    usage: `${prefix.DefaultPrefix}ping`,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const send1st = await interaction.editReply({ content: `Pinging ...`})
        new pingchecks({
            ping: 0,
            user: interaction.user.id
        }).save().then((db) => {
            pingchecks.find({ user: interaction.user.id }).deleteMany().exec();
            var a1 = [...client.ws.shards.values()].map(x => x.ping)
            const ping = new EmbedBuilder()
            .setDescription(`\`\`\`nim\nGateway Ping : : ${a1[interaction.guild.shard.id]}ms\nREST Ping : : ${math.subtract(send1st.createdTimestamp, interaction.createdTimestamp)}ms\nDatabase Ping : : ${db.ping}ms\`\`\``)
            .setColor(color.color)
            .setAuthor({ iconURL: client.user.avatarURL(), name: `🏓 Pong`})
            interaction.editReply({ content: null, embeds: [ping] })
        })
    },
};
