const { Client, GatewayIntentBits } = require('discord.js')
const { firebase, db } = require('./initDb')
const NodeCache = require('node-cache')
// Create a cache instance with a default TTL of 1 hour (3600 seconds)
const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 })

// Function to extract weekday from Firestore Timestamp
const getWeekdayFromTimestamp = (timestamp) => {
  return timestamp.toDate().getDay()
}

function filterGroupsByTime(groups, date) {
  const currentTimeInMinutes = date.getHours() * 60 + date.getMinutes()

  return groups.filter((group) => {
    const scheduledTime = group.scheduled_at.toDate()
    const scheduledTimeInMinutes = scheduledTime.getHours() * 60 + scheduledTime.getMinutes()

    const diff = currentTimeInMinutes - scheduledTimeInMinutes
    return diff <= 60 && diff >= 0
  })
}

async function getStudyGroups() {
  const cacheKey = 'studyGroups'
  // Check if the data is already in the cache
  const cachedData = myCache.get(cacheKey)
  if (cachedData) {
    return cachedData
  }

  const studyGroupsQuery = db.collection('study_groups')
  const snapshot = await studyGroupsQuery.get()
  const studyGroups = []
  snapshot.forEach((doc) => {
    studyGroups.push({ id: doc.id, ...doc.data() })
  })

  // Store the data in the cache
  myCache.set(cacheKey, studyGroups)
  return studyGroups
}

async function study_groups_in_course(date) {
  // Get the current date and time
  const currentWeekday = date.getDay() // Day of the week (0 for Sunday, 1 for Monday, etc.)

  const relevantGroups = []
  for (let data of await getStudyGroups()) {
    if (!data.scheduled_at) continue
    const scheduledWeekday = getWeekdayFromTimestamp(data.scheduled_at)
    if (scheduledWeekday === currentWeekday) {
      relevantGroups.push(data)
    }
  }
  return filterGroupsByTime(relevantGroups, date)
}

async function log_study_group(channel_id, res) {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  })

  const group_now = await study_groups_in_course(new Date())
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
          study_group_id: group_now[0].id,
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

module.exports = { log_study_group, study_groups_in_course }