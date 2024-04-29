const { Client, GatewayIntentBits } = require('discord.js')
const { firebase, db } = require('./initDb')

// Function to extract weekday from Firestore Timestamp
const getWeekdayFromTimestamp = (timestamp) => {
  return timestamp.toDate().getDay()
}

function filterGroupsByTime(groups) {
  const now = new Date()
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes()

  return groups.filter((group) => {
    const scheduledTime = group.scheduled_at.toDate()
    const scheduledTimeInMinutes = scheduledTime.getHours() * 60 + scheduledTime.getMinutes()

    const diff = currentTimeInMinutes - scheduledTimeInMinutes
    return diff <= 60 && diff >= 0
  })
}

async function study_groups_in_course() {
  // Get the current date and time
  const now = new Date()
  const currentWeekday = now.getDay() // Day of the week (0 for Sunday, 1 for Monday, etc.)

  // Query to find study groups happening on the same weekday
  const studyGroupsQuery = db.collection('study_groups')

  snapshot = await studyGroupsQuery.get()
  const relevantGroups = []
  for (doc of snapshot.docs) {
    const data = doc.data()
    if (!data.scheduled_at) continue
    const scheduledWeekday = getWeekdayFromTimestamp(data.scheduled_at)
    if (scheduledWeekday === currentWeekday) {
      relevantGroups.push({ id: doc.id, ...data })
    }
  }
  return filterGroupsByTime(relevantGroups)
}

async function log_study_group(channel_id, res) {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  })

  const group_now = await study_groups_in_course()
  if (group_now.length === 0) {
    console.log('No Study group happening now')
    return res.status(200).json({ msg: 'No study group happening now' })
  } else {
    console.log('Study group happening now: ', group_now[0].title)
  }
  client.once('ready', async () => {
    const channel = client.channels.cache.get(channel_id)
    let userIds = []
    if (channel) {
      channel.members.forEach((member) => userIds.push(member.user.id))
      client.destroy() // Log out the bot once we've collected the info

      userIds.forEach(async (userId) => {
        let itemData = {
          guild_id: channel.guild.id,
          guild_name: channel.guild.name,
          channel_id: channel_id,
          channel_name: channel.name,
          discord_id: userId, // Replace with actual Discord ID
          timestamp: firebase.firestore.FieldValue.serverTimestamp(), // This will use the server's timestamp
        }

        await db
          .collection('study_group_presence')
          .add(itemData)
          .then((doc) => {
            console.log('Document written with ID: ', doc.id)
          })
          .catch((error) => {
            console.error('Error adding document: ', error)
          })
      })

      res.status(200).json({ discordIds: userIds })
    } else {
      res.status(404).json({ error: 'Channel not found or not a voice channel.' })
    }
    client.destroy()
  })
  client.login(process.env.NEXT_PUBLIC_DISCORD_BOT_KEY)
}

exports.log_study_group = log_study_group
