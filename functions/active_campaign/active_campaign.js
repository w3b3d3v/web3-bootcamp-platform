require('dotenv').config('../.env')
const courseTags = require('./course_tags.json')

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

async function addContactToList(contactId, listId) {
  try {
    const response = await makeRequest('/contactLists', 'POST', {
      contactList: {
        list: listId,
        contact: contactId,
        status: 1,
      },
    })
    console.log(`Contact added to list ${listId} successfully`)
    return response
  } catch (error) {
    console.error(`Error adding contact to list ${listId}:`, error)
    throw error
  }
}

async function searchContactByEmail(email) {
  try {
    const endpoint = `/contacts?search=${email}`
    const response = await makeRequest(endpoint)

    if (response.contacts && response.contacts.length > 0) {
      return response.contacts[0].id
    }
    throw new Error('Contact not found')
  } catch (error) {
    console.error('Error searching contact:', error)
    throw error
  }
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

    await addContactToList(contact.id, 1) // Add to master list

    console.log('User added to ActiveCampaign and lists successfully')
    return contact
  } catch (error) {
    console.error('Error in ActiveCampaign operations:', error)
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
    const endpoint = '/tags'
    const params = '?limit=100'
    const response = await makeRequest(endpoint + params)
    console.log('Custom field metadata retrieved successfully')
    return response
  } catch (error) {
    console.error('Error fetching custom field metadata:', error)
    throw error
  }
}

exports.updateUserLessonProgress = async function (user, lessonData, cohortData) {
  try {
    // First find the contact ID
    const contactId = await searchContactByEmail(user.email)

    // Update the contact with new field values
    const contactData = {
      contact: {
        fieldValues: [
          {
            field: '9', // last_course field ID
            value: cohortData.course_id || '',
          },
          {
            field: '10', // cohort_name field ID
            value: cohortData.name || '',
          },
          {
            field: '15', // last_section field ID
            value: lessonData.section || '',
          },
        ],
      },
    }

    if (user.name) {
      contactData.contact.firstName = user.name
    }

    const response = await makeRequest(`/contacts/${contactId}`, 'PUT', contactData)

    return response
  } catch (error) {
    console.error('Error updating lesson progress in ActiveCampaign:', {
      error: error.message,
      userEmail: user.email,
      stack: error.stack,
    })
    throw error
  }
}

exports.addCourseTagToUser = async function (email, courseId) {
  try {
    // Find contact ID by email
    const contactId = await searchContactByEmail(email)

    // Get tag ID from the mapping
    const tagId = courseTags[courseId]
    if (!tagId) {
      throw new Error(`Tag ID not found for course: ${courseId}`)
    }

    // Create tag and add to contact
    const response = await makeRequest('/contactTags', 'POST', {
      contactTag: {
        contact: contactId,
        tag: tagId,
      },
    })

    console.log(`Tag ${courseId} (ID: ${tagId}) added to contact successfully`)
    return response
  } catch (error) {
    console.error('Error adding course tag in ActiveCampaign:', {
      error: error.message,
      userEmail: email,
      tagName,
      stack: error.stack,
    })
    throw error
  }
}
