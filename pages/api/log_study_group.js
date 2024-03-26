import { Client, GatewayIntentBits } from 'discord.js'

import { db } from '../../firebase/initFirebase.js'
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore'

export default async function handler(req, res) {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  })

  client.once('ready', async () => {
    const channel = client.channels.cache.get(req.query.channel_id)
    let userIds = []
    if (channel) {
      channel.members.forEach((member) => userIds.push(member.user.id))
      client.destroy() // Log out the bot once we've collected the info

      console.log(channel)
      userIds.forEach(async (userId) => {
        const docRef = doc(collection(db, 'study_group_presence'))
        let itemData = {
          guild_id: channel.guild.id,
          guild_name: channel.guild.name,
          channel_id: req.query.channel_id, // Replace with actual channel ID
          channel_name: channel.name,
          discord_id: userId, // Replace with actual Discord ID
          timestamp: serverTimestamp(), // This will use the server's timestamp
        }

        await setDoc(docRef, itemData)
          .then(() => {
            console.log('Document written with ID: ', docRef.id)
          })
          .catch((error) => {
            console.error('Error adding document: ', error)
          })
      })

      res.status(200).json({ discordIds: userIds })
    } else {
      res.status(404).json({ error: 'Channel not found or not a voice channel.' })
      client.destroy() // Make sure to log out the bot if we can't find the channel
    }
  })

  client.login(process.env.NEXT_PUBLIC_DISCORD_BOT_KEY)
}
