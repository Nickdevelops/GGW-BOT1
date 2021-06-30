module.exports = {
    name: 'fish',
    cooldown: 300,
    permissions: [],
    description: "Fish Command!",
    async execute(client, message, cmd, args, Discord) {
        function random() {
            const num = Math.floor(Math.random() * 5)
            return num === 1
          }

          if(random() === true ) {
            const Boot = 0
            message.channel.send(`Congrats you have just caught a Boot :hiking_boot: and gained ${Boot} coins!`)
            client.add(message.author.id, Boot)

        } else if(random() === true ) {
                const YellowFish = 500
                message.channel.send(`Congrats you have just caught a Yellow Fish :tropical_fish: and gained ${YellowFish} coins!`)
                client.add(message.author.id, YellowFish)
        
        } else if(random() === true) {
            const FatFish = 1000
            message.channel.send(`Congrats you have caught a FatFish Fat Fish :blowfish: and gained ${FatFish} coins!`)
            client.add(message.author.id, FatFish)
        } else if(random() === true) {
            const BlueFish = 1500
            message.channel.send(`Congrats you have cought a Blue Fish :fish: and gained ${BlueFish} coins!`)
            client.add(message.author.id, BlueFish)
        } else if(random() === true) {
            const Dolphin = 2000
            message.channel.send(`Congrats you have just caught a Dolphin :dolphin: and gained ${Dolphin} coins!`)
            client.add(message.author.id, Dolphin)
        } else if(random() === true) {
            const Lobster = 2500
            message.channel.send(`Congrats you have just caught a Lobster :lobster: and gained ${Lobster} coins!`)
            client.add(message.author.id, Lobster)
        } else if(random() === true) {
            const Shark = 3000
            message.channel.send(`Congrats you have just caught a Shark :shark: and gained ${Shark} coins!`)
            client.add(message.author.id, Shark)
        } else if(random() === true) {
            const Crab = 3500
            message.channel.send(`Congrats you have just caught a Crab :crab: and gained ${Crab} coins!`)
            client.add(message.author.id, Crab)
        } else if(random() === true) {
            const Squid = 4000
            message.channel.send(`Congrats you have just caught a Squid :squid: and gained ${Squid} coins!`)
            client.add(message.author.id, Squid)
        } else if(random() === true) {
            const Whale = 4500
            message.channel.send(`Congrats you have just caught a Whale :whale2: and gained ${Whale} coins!`)
            client.add(message.author.id, Whale)
        } else if(random() === true) {
            const Shrimp = 5000
            message.channel.send(`Congrats you have just caught a Shrimp :shrimp: and gained ${Shrimp} coins!`)
            client.add(message.author.id, Shrimp)
        } else if(random() === true) {
            const Octopus = 5000
            message.channel.send(`Congrats you have just caught an Octopus :octopus: and gained ${Octopus} coins!`)
            client.add(message.author.id, Octopus)
        } else if(random() === true) {
            const Diamond = 10000
            message.channel.send(`Congrats you have just caught a Diamond :gem: and gained ${Diamond}coins!`)
            client.add(message.author.id, Diamond)
        }
        
        
        
    } 
}