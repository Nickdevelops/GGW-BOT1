module.exports = {
    name: 'daily',
    cooldown: 86400,
    permissions: [],
    descrption: "Daily Command!",
    async execute(client, message, cmd, args, Discord) {
        
        const coins = Math.floor(Math.random() * 2000) + 1;

        message.channel.send(`You recieved **${coins}** coins! Make sure to come and claim it again tommorow`)
        client.add(message.author.id, coins)
    }
}