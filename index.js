/*
** EPITECH PROJECT, 2020
** bot1
** File description:
** index.js
*/

const ytdl = require("discord-ytdl-core");
const Discord = require("discord.js");
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});
client.once('reconnecting', () => {
    console.log('Reconnecting!');
});
client.once('disconnect', () => {
    console.log('Disconnect');
});

client.on("message", msg => {
    arg = msg.content.split(" ");
    if (arg[0] === "Bonjour" && !msg.author.bot) {
        msg.channel.send("oue c'est ça ferme ta gueule.");
        return;
    }
    if (arg[0] === "man" && !msg.author.bot) {
        if (!arg[1]) {
            msg.channel.send("no argument for man");
            return;
        }
        switch (arg[1]) {
            case "man":
                msg.channel.send("yo man, smoke dat weeeed");
                break;
        }
    }
    if (arg[0] === "play" && !msg.author.bot) {
        if (!arg[1]) {
            msg.channel.send("ta pa mi de musik pd");
            return;
        }
        if (!ytdl.validateURL(arg[1])) {
            msg.channel.send("ton URL marche ap");
            return;
        }
        if (!msg.member.voice.channel)
            return msg.channel.send("You're not in a voice channel.");
        let stream = ytdl(arg[1], {
        filter: "audioonly",
        opusEncoded: true,
        encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
    });
    msg.member.voice.channel.join()
    .then(connection => {
    let dispatcher = connection.play(stream, {
    type: "opus"
    })
    .on("finish", () => {
    msg.guild.me.voice.channel.leave();
    })
    });
    }
})

client.login("ODI0NTcwNzA1MjgyMDcyNTg4.YFxTTw.ni27a7k7DJ9L3mKElekKcEwVV5U");