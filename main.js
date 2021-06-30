const Discord = require('discord.js');
//const { execute } = require('./commands/warn');
require('dotenv').config();
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]})
const memberCounter = require('./counters/member-counter');
const db = require("quick.db");
const schema = require('./models/schema')
const mongo = require('mongoose')
const distube = require('distube');
const player = new distube(client);


client.player = player;

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

player
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user.tag}\n${status(queue)}`
  ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user.tag}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user.tag}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))

    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })

    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });



client.commands = new Discord.Collection();
client.events = new Discord.Collection();



['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})



mongo
  .connect(process.env.MONGODB_SRV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
  })
  .then(() => {
      console.log("Connected to the database!")
  })
  .catch((err) => {
      console.log(err)
  })




  client.on('ready', () => {
    console.log('')
    client.user.setActivity('+ help', {type: 'PLAYING'}).catch(console.error);
    memberCounter(client);

  
    
});


client.on('message', async message => {
    if(message.channel.type === 'dm' || message.author.bot) return;

    const Channel = client.channels.cache.get('857728109109575720')
    let nword = ['nigga', 'nigger']

    let foundInText = false;
    for(var i in nword) {
        if (message.content.toLowerCase().includes(nword[i].toLowerCase())) foundInText = true
    }

    if (foundInText) {
        let logEmbed = new Discord.MessageEmbed()
        .setTitle("N-WORD ALERT!")
        .setDescription(`<@${message.author.id}> said the n-word!`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor("RANDOM")
        .addField('Message', message.content)
        .setTimestamp()
        Channel.send(logEmbed)

        let e = new Discord.MessageEmbed()
        .setDescription('N-Word is not allowed here!')
        .setColor("RANDOM")
        .setTimestamp()
        await message.channel.send(e)
        message.delete()
    }
})









client.on('guildMemberAdd', member =>{
    let welcomeRole = member.guild.roles.cache.find(role => role.name === 'member');
    let chx = db.get(`welcomec_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }
 
    member.roles.add(welcomeRole);
    const embed = new Discord.MessageEmbed();
    embed.setTitle(`Welcome to ${member.guild.name}` )
    embed.setColor("RANDOM")
    embed.setDescription(`Welcome <@${member.user.id}> to  ${member.guild.name}  `)
    embed.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
    embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    embed.addField('Date', member.user.createdAt, true)
    embed.addField('Members', member.guild.memberCount, true)

    member.guild.channels.cache.get(chx).send(embed)
});



//functions
client.bal = (id) => new Promise(async ful => {
    const data = await schema.findOne({ id });
    if(!data) return ful(0);
    ful(data.coins);
})


client.add = (id, coins) => {
    schema.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.coins += coins;
        } else {
            data= new schema({ id, coins})
        }
        data.save()
    })
}

client.rmv = (id, coins) => {
    schema.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.coins -= coins;
        } else {
            data= new schema({ id, coins: -coins})
        }
        data.save()
    })
}








client.login(process.env.DISCORD_TOKEN);