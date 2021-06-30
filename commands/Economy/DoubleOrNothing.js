module.exports = {
    name: 'double-or-nothing',
    permissions: [],
    description: "Game Command",
    async execute(client, message, cmd, args, Discord) {
        if(!args[0]) return message.reply('Please specify an amount to bet!')

        if(isNaN(args[0])) return message.reply('Argument must be a number!')

        const amountToBet = parseInt(args[0])

        if(await client.bal(message.author.id) < amountToBet) return message.reply('You have insufficient balance to make this bet!')

        function random() {
          const num = Math.floor(Math.random() * 2)
          return num === 1
        }

        if(random() === true ) {
            const winAmount = amountToBet * 2
            message.channel.send(`Congrats you have won ${winAmount} coins!`)
            client.add(message.author.id, winAmount)
        } else {
            message.channel.send(
            `Aww you lost ${amountToBet} coins. Better luck next time!`
            )
            client.rmv(message.author.id, amountToBet)
        }
    }
}