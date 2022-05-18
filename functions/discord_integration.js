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

async function onCohortSignup(newUserValue, previousUserValue, cohorts, admin) {
  const previousCohortData = previousUserValue.cohorts.map(item => item?.cohort_id)

  const userCohorts = newUserValue.cohorts

  const userCohortsIds = userCohorts.filter(item => !previousCohortData?.includes(item.cohort_id))

  const discordId = newUserValue?.discord?.id

  if(userCohortsIds[0]?.cohort_id && discordId) {

    const snapshot = await cohorts.where(admin.firestore.FieldPath.documentId(), '==', userCohortsIds[0]?.cohort_id).get()

    snapshot.forEach((doc) => {

      const cohort = doc.data()

      const { discord_role } = cohort

      addUserToRole(discordId, discord_role)
    })
  }
}
module.exports = {addUserToRole, onCohortSignup}
