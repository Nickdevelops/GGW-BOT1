module.exports = {
  name: 'bal',
  permissions: [],
  descrption: "Balance Command!",
  async execute(client, message, cmd, args, Discord) {
    const bal = await client.bal(message.member.id);
    message.channel.send(bal + " coins")
  }
}