const { Message, Client, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const math = require('mathjs');
const color = require('../../json/color/default.json');
const pingchecks = require('../../schemas/pingchecks')
const prefix = require('../../json/prefix/PrefixList.json')

module.exports = {
    name: "ping",
    aliases: [],
    timeout: 5000,
    clientPermissions: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
    userPermissions: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
    about: 'Check My Ping!',
    usage: `${prefix.DefaultPrefix}ping`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const send1st = await message.channel.send({ content: `Pinging ...`})
        new pingchecks({
            ping: 0,
            user: message.author.id
        }).save().then((db) => {
            pingchecks.find({ user: message.author.id }).deleteMany().exec();
            var a1 = [...client.ws.shards.values()].map(x => x.ping)
            const ping = new EmbedBuilder()
            .setDescription(`\`\`\`nim\nGateway Ping : : ${a1[message.guild.shardId]}ms\nREST Ping : : ${math.subtract(send1st.createdTimestamp, message.createdTimestamp)}ms\nDatabase Ping : : ${db.ping}ms\`\`\``)
            .setColor(color.color)
            .setAuthor({ iconURL: client.user.avatarURL(), name: `🏓 Pong`})
            send1st.edit({ content: null, embeds: [ping] })
        })
    },
};
