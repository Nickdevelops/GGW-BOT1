const db = require("quick.db");//require the packages


module.exports = {
    name: 'whitelist',
    category: 'Dev',
    description: 'Whitelist a user',
    cooldown: 0,
    permissions: [],
    aliases: ['unblock'],
    usage: 'whitelist <@user>',
    async execute(client, message, cmd, args, Discord) {//everyone haves different execute parameters
        if(message.author.id != 853242804997062726) return message.channel.send("Only the bot owner can use this command") //add your id without quotes
    
        let user;
        if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else if (args[0]) {
          user = message.guild.members.cache.get(args[0]).user;
        } 
        
        if(!user) return message.channel.send("You did not specify a user")
    
        let blacklist = db.get(`blacklist_${user.id}`)
        
        if(blacklist === 0 || blacklist === null) return message.channel.send(`${user}, Is not blacklisted`) //here you are checking if the user is already blacklisted
        
        const embed = new Discord.MessageEmbed()
        .setAuthor('Hype', client.user.displayAvatarURL())
        .setTitle('Blacklisted!')
        .setDescription('Damn, It looks like you have been blacklisted from the bot... sad')
        .setTimestamp()
        user.send(embed)

        message.channel.send(`${user} been whitelisted!`)
    db.delete(`blacklist_${user.id}`, 1)//here you delete the "blacklist" status from the database
    }
}