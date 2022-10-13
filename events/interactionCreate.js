const commandrunner = require('../json/command/commandrunner.json')

if (!commandrunner.SlashCommandEnable) {

} else {
    const { InteractionType, EmbedBuilder } = require('discord.js');
    const client = require("../index")
    const math = require('mathjs');
    const prettyms = require('pretty-ms');
    const {timeout1, timeout2} = require("../Collection/timeout");
    
    client.on('interactionCreate', async (interaction) => {
        if (interaction.type === InteractionType.ApplicationCommand) {
            await interaction.deferReply({ ephemeral: false }).catch(() => {});
    
            const cmd = client.SlashCommands.get(interaction.commandName);
    
            if (!cmd) return interaction.editReply({ content: `No command was found`})
    
            const args = [];
    
            for (let option of interaction.options.data) {
                if (option.type === "SUB_COMMAND") {
                    if (option.name) args.push(option.name);
                    option.options?.forEach((x) => {
                        if (x.value) args.push(x.value);
                    })
                } else if (option.value) args.push(option.value);
            }
            interaction.member = interaction.guild.members.cache.get(interaction.user.id);
            const permlist = {
                "1": "Create Instant Invite",
                "2": "Kick Members",
                "4": "Ban Members",
                "8": "Administrator",
                "16": "Manage Channels",
                "32": "Manage Guild",
                "64": "Add Reactions",
                "128": "View Audit Log",
                "256": "Priority Speaker",
                "512": "Stream",
                "1024": "View Channel",
                "2048": "Send Messages",
                "4096": "Send TTS Messages",
                "8192": "Manage Messages",
                "16384": "Embed Links",
                "32768": "Attach Files",
                "65536": "Read Message History",
                "131072": "Mention Everyone",
                "262144": "Use External Emojis",
                "524288": "View Guild Insights",
                "1048576": "Connect",
                "2097152": "Speak",
                "4194304": "Mute Members",
                "8388608": "Deafen Members",
                "16777216": "Move Members",
                "33554432": "Use VAD",
                "67108864": "Change Nickname",
                "134217728": "Manage Nicknames",
                "268435456": "Manage Roles",
                "536870912": "Manage Webhooks",
                "1073741824": "Manage Emojis And Stickers",
                "2147483648": "Use Application Commands",
                "4294967296": "Request To Speak",
                "8589934592": "Manage Events",
                "17179869184": "Manage Threads",
                "34359738368": "Create Public Threads",
                "68719476736": "Create Private Threads",
                "137438953472": "Use External Stickers",
                "274877906944": "Send Messages In Threads",
                "549755813888": "Use Embedded Activities",
                "1099511627776": "Moderate Members",
            }
            for (let perm of cmd.clientPermissions) {
                const noperm = new EmbedBuilder()
                .setDescription(`I need \`${permlist[perm]}\` permission to work.`)
                .setColor('Red')
                if (!interaction.guild.members.me.permissions.has(perm) && perm === 1024n) return
                if (!interaction.guild.members.me.permissions.has(perm) && perm === 2048n) return
                if (!interaction.guild.members.me.permissions.has(perm) && perm === 16384n) return interaction.editReply({ content: `I need \`${permlist[perm]}\` permission to work.`})
                if (!interaction.guild.members.me.permissions.has(perm)) return interaction.editReply({ embeds: [noperm] })
            }
            for (let perm of cmd.userPermissions) {
                const noperm = new EmbedBuilder()
                .setDescription(`You need \`${permlist[perm]}\` permission to use this command.`)
                .setColor('Red')
                if (!interaction.member.permissions.has(perm) && perm === 1024n) return
                if (!interaction.member.permissions.has(perm) && perm === 2048n) return
                if (!interaction.member.permissions.has(perm) && perm === 16384n) return interaction.editReply({ content: `You need \`${permlist[perm]}\` permission to use this command.`})
                if (!interaction.member.permissions.has(perm)) return interaction.editReply({ embeds: [noperm] })
            }
            if (cmd) {
                if (cmd.timeout) {
                    if (timeout2.has(interaction.member.id)) return interaction.deleteReply();
                    var lo1 = 0;
                    if (timeout1.has(`${cmd.name}${interaction.member.id}`)) lo1 = math.subtract(timeout1.get(`${cmd.name}${interaction.member.id}`), Date.now())
                    const embedtimeout1 = new EmbedBuilder()
                    .setDescription(`You need to wait **${prettyms(lo1, { verbose: true })}**.`)
                    .setColor("Red");
                    if (timeout1.has(`${cmd.name}${interaction.member.id}`)) return timeout2.set(interaction.member.id, "timeout2") && interaction.editReply({ embeds: [embedtimeout1] }).then((i) => {
                        setTimeout(() => {
                            i.delete().catch(err => {if (err) return})
                        }, math.subtract(timeout1.get(`${cmd.name}${interaction.member.id}`), Date.now()))
                    })
                    cmd.run(client, interaction, args);
                    timeout1.set(`${cmd.name}${interaction.member.id}`, math.add(Date.now(), cmd.timeout))
                    setTimeout(() => {
                        timeout1.delete(`${cmd.name}${interaction.member.id}`)
                        timeout2.delete(interaction.member.id);
                    }, cmd.timeout)
                } else cmd.run(client, interaction, args);
            }
        }
    
        if (interaction.isContextMenuCommand()) {
            await interaction.deferReply({ ephemeral: false });
            const command = client.SlashCommands.get(interaction.commandName);
            const permlist = {
                "1": "Create Instant Invite",
                "2": "Kick Members",
                "4": "Ban Members",
                "8": "Administrator",
                "16": "Manage Channels",
                "32": "Manage Guild",
                "64": "Add Reactions",
                "128": "View Audit Log",
                "256": "Priority Speaker",
                "512": "Stream",
                "1024": "View Channel",
                "2048": "Send Messages",
                "4096": "Send TTS Messages",
                "8192": "Manage Messages",
                "16384": "Embed Links",
                "32768": "Attach Files",
                "65536": "Read Message History",
                "131072": "Mention Everyone",
                "262144": "Use External Emojis",
                "524288": "View Guild Insights",
                "1048576": "Connect",
                "2097152": "Speak",
                "4194304": "Mute Members",
                "8388608": "Deafen Members",
                "16777216": "Move Members",
                "33554432": "Use VAD",
                "67108864": "Change Nickname",
                "134217728": "Manage Nicknames",
                "268435456": "Manage Roles",
                "536870912": "Manage Webhooks",
                "1073741824": "Manage Emojis And Stickers",
                "2147483648": "Use Application Commands",
                "4294967296": "Request To Speak",
                "8589934592": "Manage Events",
                "17179869184": "Manage Threads",
                "34359738368": "Create Public Threads",
                "68719476736": "Create Private Threads",
                "137438953472": "Use External Stickers",
                "274877906944": "Send Messages In Threads",
                "549755813888": "Use Embedded Activities",
                "1099511627776": "Moderate Members",
            }
            for (let perm of command.clientPermissions) {
                const noperm = new EmbedBuilder()
                .setDescription(`I need \`${permlist[perm]}\` permission to work.`)
                .setColor('Red')
                if (!interaction.guild.members.me.permissions.has(perm) && perm === 1024n) return
                if (!interaction.guild.members.me.permissions.has(perm) && perm === 2048n) return
                if (!interaction.guild.members.me.permissions.has(perm) && perm === 16384n) return interaction.editReply({ content: `I need \`${permlist[perm]}\` permission to work.`})
                if (!interaction.guild.members.me.permissions.has(perm)) return interaction.editReply({ embeds: [noperm] })
            }
            for (let perm of command.userPermissions) {
                const noperm = new EmbedBuilder()
                .setDescription(`You need \`${permlist[perm]}\` permission to use this command.`)
                .setColor('Red')
                if (!interaction.member.permissions.has(perm) && perm === 1024n) return
                if (!interaction.member.permissions.has(perm) && perm === 2048n) return
                if (!interaction.member.permissions.has(perm) && perm === 16384n) return interaction.editReply({ content: `You need \`${permlist[perm]}\` permission to use this command.`})
                if (!interaction.member.permissions.has(perm)) return interaction.editReply({ embeds: [noperm] })
            }
            if (command) {
                if (command.timeout) {
                    if (timeout2.has(interaction.member.id)) return interaction.deleteReply();
                    var lo1 = 0;
                    if (timeout1.has(`${command.name}${interaction.member.id}`)) lo1 = math.subtract(timeout1.get(`${command.name}${interaction.member.id}`), Date.now())
                    const embedtimeout1 = new EmbedBuilder()
                    .setDescription(`You need to wait **${prettyms(lo1, { verbose: true })}**.`)
                    .setColor("Red");
                    if (timeout1.has(`${command.name}${interaction.member.id}`)) return timeout2.set(interaction.member.id, "timeout2") && interaction.editReply({ embeds: [embedtimeout1] }).then((i) => {
                        setTimeout(() => {
                            i.delete().catch(err => {if (err) return})
                        }, math.subtract(timeout1.get(`${command.name}${interaction.member.id}`), Date.now()))
                    })
                    command.run(client, interaction);
                    timeout1.set(`${command.name}${interaction.member.id}`, math.add(Date.now(), command.timeout))
                    setTimeout(() => {
                        timeout1.delete(`${command.name}${interaction.member.id}`)
                        timeout2.delete(interaction.member.id);
                    }, command.timeout)
                } else command.run(client, interaction);
            }
        }
    })
}
