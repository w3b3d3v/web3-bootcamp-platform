const { db } = require('../lib/firebaseInit')
const { Octokit, App } = require('octokit')
const octokit = new Octokit({
  auth: '',
})

async function fetchUser(userId, replace = false) {
  console.log('saving user: ', userId)
  const docRef = db.collection('github_users').doc(user.login)
  const doc = await docRef.get()

  if (!doc.exists || replace) {
    const result = await octokit.request('GET /users/{user}', { user: userId })
    const user = result.data
    await docRef.set(user)
  }

  const newDoc = await docRef.get()
  if (newDoc.exists) {
    const result2 = await octokit.request('GET  ', {
      user: userId,
    })
    docRef.update({ commits: result2.data.total_count })
  }
}

async function fetchByLocation(location) {
  let query = {
    q: `location:${location}`,
    sort: 'repositories',
    order: 'desc',
    per_page: 100,
  }
  for (let page = 1; page <= 10; page++) {
    query.page = page
    const result = await octokit.request('GET /search/users', query)
    for (user of result.data.items) {
      fetchUser(user.login)
    }
  }
}

async function fetchGithubUsers(startId, endId) {
  let result = await octokit.request('GET /users', { per_page: 1, since: startId })
  let data = result.data

  let count = startId
  while (data[data.length - 1].id < endId) {
    console.log(result)
    result = await octokit.request('GET /users', {
      per_page: 100,
      since: data[data.length - 1].id + 1,
    })
    data = result.data
    count += 100
    console.log(data[data.length - 1].id)
  }
}

fetchByLocation('Brasil')

module.exports = { fetchGithubUsers, fetchByLocation, fetchUser }
