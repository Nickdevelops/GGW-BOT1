module.exports = {
    name: 'add',
    permissions: [],
    description: "Add Command!",
    async execute(client, message, cmd, args, Discord) {
        if(message.author.id != 853242804997062726 || 850766730665918524 || 779314986434035733) return message.channel.send("This can only be ran by the bot owner!") 
        
        const member = message.mentions.members.first() || message.member
        
        client.add(member.id, parseInt(args[0]));

        message.channel.send("Added balance")

    }
}