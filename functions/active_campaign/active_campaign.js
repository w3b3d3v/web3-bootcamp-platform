require('dotenv').config('../.env')

const API_URL = `https://${process.env.ACTIVE_CAMPAIGN_API_URL}.api-us1.com/api/3`
const API_TOKEN = process.env.ACTIVE_CAMPAIGN_API_KEY

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Api-Token': API_TOKEN,
}

async function makeRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  }

  const response = await fetch(`${API_URL}${endpoint}`, options)
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  return response.json()
}

exports.createActiveCampaignUser = async function (user) {
  try {
    // Create or update contact
    const { contact } = await makeRequest('/contacts', 'POST', {
      contact: {
        email: user.email,
        firstName: user.name || '',
        fieldValues: [
          {
            field: '2',
            value: user.photoUrl,
          },
          {
            field: '13',
            value: 'BUILD_PLATFORM_API',
          },
        ],
      },
    })

    console.log('User added to ActiveCampaign successfully')
    return contact
  } catch (error) {
    console.error('Error creating user in ActiveCampaign:', error)
    throw error
  }
}

exports.fetchUSer = async function () {
  let userId = 2792
  console.log('Fetching user from ActiveCampaign...', userId)
  try {
    const contact = await makeRequest(`/contacts/${userId}`)
    console.log('User retrieved from ActiveCampaign successfully')
    return contact
  } catch (error) {
    console.error('Error fetching user from ActiveCampaign:', error)
    throw error
  }
}

exports.fetchCustomFieldMeta = async function () {
  console.log('Fetching custom field metadata from ActiveCampaign...')
  try {
    const endpoint = '/fields'
    const params = '?limit=100'
    const response = await makeRequest(endpoint + params)
    console.log('Custom field metadata retrieved successfully')
    return response
  } catch (error) {
    console.error('Error fetching custom field metadata:', error)
    throw error
  }
}
