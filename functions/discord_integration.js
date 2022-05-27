const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_KEY)

async function addDiscordRole(user_id, role) {
  if(!user_id) return new Promise(()=>{});
  try {
    const guild_id = process.env.DISCORD_SERVER_ID
    return rest.put(Routes.guildMemberRole(guild_id, user_id, role))
  } catch(error) {
    console.error(error)
  }
}
module.exports = { addDiscordRole }
