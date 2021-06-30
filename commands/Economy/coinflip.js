module.exports = {
    name: 'coinflip',
    permissions: [],
    description: 'Coinflip Command!',
    async execute(client, message, cmd, args, Discord) {
        const TailsHead = args.join(' ');
        if (!TailsHead)
          return message.reply("b")
        const amountToBet = args[2];
        if (!amountToBet)
          return message.reply("a")

          if (isNaN(amountToBet))
          return message.reply("Coins must be a number")
           

          const convertedGive = parseInt(amountToBet)
          if ((await client.bal(message.author.id)) < convertedGive)
          return message.reply("You have an insufficient balance!")

        function random() {
            const num = Math.floor(Math.random() * 2)
            return num === 1
        }
       
        if (TailsHead === 'tails' || 'head') {
            if(random() === true) {
                if (TailsHead === 'tails') {
                    message.channel.send(`Congrats! It was **tails** you won **${amountToBet}** coins!`)
                    client.add(message.author.id, amountToBet)
                
                } else {
                    message.channel.send(`Awwwww! It was head you lost **${amountToBet}** coins! Better luck next time!`)
                    client.rmv(message.author.id, amountToBet)
     
                }
            }  else if (TailsHead === 'head') {
                message.channel.send(`Congrats! It was **head** you won **${amountToBet}** coins!`)
                client.add(message.author.id, amountToBet) 
                


            } else {
                message.channel.send(`Awwwww! It was head you lost **${amountToBet}** coins! Better luck next time!`)
                client.rmv(message.author.id, amountToBet)
            }
        }
 
    }
}
