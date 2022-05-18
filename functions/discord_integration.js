const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_KEY)

function addUserToRole(user_id, role_id) {
  try {
    const guild_id = process.env.DISCORD_SERVER_ID
    return rest.put(Routes.guildMemberRole(guild_id, user_id, role_id))
  } catch (error) {
    console.error(error)
  }
}

async function addDiscordRole(discord_id, discord_role) {
    addUserToRole(discord_id, discord_role)
}
module.exports = {addUserToRole, addDiscordRole}
