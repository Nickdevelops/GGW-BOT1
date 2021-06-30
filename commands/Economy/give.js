module.exports = {
    name: 'give',
    permissions: [],
    description: "Give Command!",
    async execute(client, message, cmd, args, Discord) {
          const user = message.mentions.users.first()
          if (!user) return message.reply("Please mention a user!")

          const coinsToGive = args[1];
          if (!coinsToGive)
          return message.reply("Please specify an amount of coins to give!")


          if (isNaN(coinsToGive))
          return message.reply("Coins must be a number")
           

          const convertedGive = parseInt(coinsToGive)
          if ((await client.bal(message.author.id)) < convertedGive)
          return message.reply("You have an insufficient balance!")

          await client.rmv(message.author.id, convertedGive)
          await client.add(user.id, convertedGive) 
          
          message.channel.send(
              `${message.author} has given ${convertedGive} coins to ${user}`
          )


    }
} 