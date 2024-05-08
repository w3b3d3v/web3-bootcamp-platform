const { Client, GatewayIntentBits } = require('discord.js')
const { firebase, db } = require('./initDb')

async function saveInvites() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildMembers,
    ],
  })
  await client.login(process.env.NEXT_PUBLIC_DISCORD_BOT_KEY)
  const guild = client.guilds.cache.get('898706705779687435') // Replace with your Guild ID
  if (!guild) return console.error('Guild not found')
  const invites = await guild.invites.fetch()
  console.log(`Fetched ${invites.size} invites`) // Log the number of invites fetched
  const inviteData = invites.map((invite) => ({
    code: invite.code,
    uses: invite.uses,
    discord_id: invite.inviter.id,
    discord: `${invite.inviter.username}#${invite.inviter.discriminator}`,
    createdTimestamp: firebase.firestore.Timestamp.fromMillis(invite.createdTimestamp), // Convert createdTimestamp
  }))
  const batch = db.batch()
  inviteData.forEach((data) => {
    const docRef = db.collection('discord_invites').doc(data.code)
    batch.set(docRef, data, { merge: true })
  })
  return batch.commit().then(() => console.log('Updated invite statistics in Firestore.'))
}

exports.saveInvites = saveInvites
