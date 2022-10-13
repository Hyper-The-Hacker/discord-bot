const commandrunner = require('../json/command/commandrunner.json')

if (!commandrunner.MessageCommandEnable) {

} else {
    const client = require('../index');
    const prefixConfig = require('../json/prefix/PrefixList.json');
    const {timeout1, timeout2} = require("../Collection/timeout");
    const prettyms = require('pretty-ms');
    const math = require('mathjs');
    const { EmbedBuilder } = require('discord.js');
    
    client.on("messageCreate",(message) => {    
        if (message.content.startsWith(prefixConfig.DefaultPrefix)) {
            if (message.author.bot || !message.guild || message.content.toLowerCase().startsWith(prefixConfig.DefaultPrefix)) return;
            const [cmd, ...args] = message.content.slice(prefixConfig.DefaultPrefix.length).trim().split(/ +/g);
            const command = client.MessageCommands.get(cmd.toLowerCase()) || client.MessageCommands.find(c => c.aliases?.includes(cmd.toLowerCase()));
            if (!command) return;
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
                if (!message.guild.members.me.permissions.has(perm) && perm === 1024n) return
                if (!message.guild.members.me.permissions.has(perm) && perm === 2048n) return
                if (!message.guild.members.me.permissions.has(perm) && perm === 16384n) return message.channel.send({ content: `I need \`${permlist[perm]}\` permission to work.`})
                if (!message.guild.members.me.permissions.has(perm)) return message.channel.send({ embeds: [noperm] })
            }
            for (let perm of command.userPermissions) {
                const noperm = new EmbedBuilder()
                .setDescription(`You need \`${permlist[perm]}\` permission to use this command.`)
                .setColor('Red')
                if (!message.member.permissions.has(perm) && perm === 1024n) return
                if (!message.member.permissions.has(perm) && perm === 2048n) return
                if (!message.member.permissions.has(perm) && perm === 16384n) return message.channel.send({ content: `You need \`${permlist[perm]}\` permission to use this command.`})
                if (!message.member.permissions.has(perm)) return message.channel.send({ embeds: [noperm] })
            }
            if (command) {
                if (command.timeout) {
                    if (timeout2.has(message.author.id)) return;
                    var lo1 = 0;
                    if (timeout1.has(`${command.name}${message.author.id}`)) lo1 = math.subtract(timeout1.get(`${command.name}${message.author.id}`), Date.now())
                    const embedtimeout1 = new EmbedBuilder()
                    .setDescription(`You need to wait **${prettyms(lo1, { verbose: true })}**.`)
                    .setColor("Red");
                    if (timeout1.has(`${command.name}${message.author.id}`)) return timeout2.set(message.author.id, "timeout2") && message.channel.send({ embeds: [embedtimeout1] }).then((msg) => {
                        setTimeout(() => {
                            msg.delete().catch(err => {if (err) return})
                        }, math.subtract(timeout1.get(`${command.name}${message.author.id}`), Date.now()))
                    })
                    command.run(client, message, args);
                    timeout1.set(`${command.name}${message.author.id}`, math.add(Date.now(), command.timeout))
                    setTimeout(() => {
                        timeout1.delete(`${command.name}${message.author.id}`)
                        timeout2.delete(message.author.id);
                    }, command.timeout)
                } else command.run(client, message, args);
            }
        } else if (prefixConfig.nonPrefix.includes(message.author.id)) {
            if (message.author.bot || !message.guild ) return;
            const [cmd, ...args] = message.content.trim().split(/ +/g);
            const command = client.MessageCommands.get(cmd.toLowerCase()) || client.MessageCommands.find(c => c.aliases?.includes(cmd.toLowerCase()));
            if (!command) return;
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
                if (!message.guild.members.me.permissions.has(perm) && perm === 1024n) return
                if (!message.guild.members.me.permissions.has(perm) && perm === 2048n) return
                if (!message.guild.members.me.permissions.has(perm) && perm === 16384n) return message.channel.send({ content: `I need \`${permlist[perm]}\` permission to work.`})
                if (!message.guild.members.me.permissions.has(perm)) return message.channel.send({ embeds: [noperm] })
            }
            for (let perm of command.userPermissions) {
                const noperm = new EmbedBuilder()
                .setDescription(`You need \`${permlist[perm]}\` permission to use this command.`)
                .setColor('Red')
                if (!message.member.permissions.has(perm) && perm === 1024n) return
                if (!message.member.permissions.has(perm) && perm === 2048n) return
                if (!message.member.permissions.has(perm) && perm === 16384n) return message.channel.send({ content: `You need \`${permlist[perm]}\` permission to use this command.`})
                if (!message.member.permissions.has(perm)) return message.channel.send({ embeds: [noperm] })
            }
            if (command) {
                if (command.timeout) {
                    if (timeout2.has(message.author.id)) return;
                    var lo1 = 0;
                    if (timeout1.has(`${command.name}${message.author.id}`)) lo1 = math.subtract(timeout1.get(`${command.name}${message.author.id}`), Date.now())
                    const embedtimeout1 = new EmbedBuilder()
                    .setDescription(`You need to wait **${prettyms(lo1, { verbose: true })}**.`)
                    .setColor("Red");
                    if (timeout1.has(`${command.name}${message.author.id}`)) return timeout2.set(message.author.id, "timeout2") && message.channel.send({ embeds: [embedtimeout1] }).then((msg) => {
                        setTimeout(() => {
                            msg.delete().catch(err => {if (err) return})
                        }, math.subtract(timeout1.get(`${command.name}${message.author.id}`), Date.now()))
                    })
                    command.run(client, message, args);
                    timeout1.set(`${command.name}${message.author.id}`, math.add(Date.now(), command.timeout))
                    setTimeout(() => {
                        timeout1.delete(`${command.name}${message.author.id}`)
                        timeout2.delete(message.author.id);
                    }, command.timeout)
                } else command.run(client, message, args);
            }
        } else return;
    })
}