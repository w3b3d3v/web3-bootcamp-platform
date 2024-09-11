import React, { useState, useEffect } from 'react'
import { withProtected } from '../../hooks/route'
import { useRouter } from 'next/router'
import { db, storage } from '../../firebase/initFirebase'
import { collection, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// Add this helper function at the top of your component
const convertTimestampToDateTimeLocal = (timestamp) => {
  if (!timestamp) return ''
  const date =
    timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp.seconds * 1000)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

function EditStudyGroup({ user }) {
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [formData, setFormData] = useState({})

  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    const querySnapshot = await getDocs(collection(db, 'study_groups'))
    const groupsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    // Sort groups: active groups by index, then inactive groups
    const sortedGroups = groupsData.sort((a, b) => {
      if (a.active && !b.active) return -1
      if (!a.active && b.active) return 1
      if (a.active === b.active) return (a.index || 0) - (b.index || 0)
      return 0
    })

    setGroups(sortedGroups)
  }

  const handleGroupSelect = (e) => {
    const selectedGroupId = e.target.value
    const group = groups.find((g) => g.id === selectedGroupId)
    setSelectedGroup(group)
    if (group) {
      const newFormData = {}
      Object.entries(group).forEach(([key, value]) => {
        if (value instanceof Timestamp) {
          newFormData[key] = value.toDate().toISOString().slice(0, 16)
        } else {
          newFormData[key] = value
        }
      })
      setFormData(newFormData)
    }
  }

  // Modify handleChange to correctly handle the scheduled_at field
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => {
      let newData = { ...prevData }

      if (name === 'scheduled_at') {
        newData[name] = value ? Timestamp.fromDate(new Date(value)) : null
      } else if (name.startsWith('metadata.')) {
        const [, lang, field] = name.split('.')
        newData.metadata = {
          ...newData.metadata,
          [lang]: {
            ...newData.metadata[lang],
            [field]: value,
          },
        }
        // Also update the main field if it's title or description
        if (field === 'title' || field === 'description') {
          newData[field] = value
        }
      } else {
        newData[name] = value
        // Also update the metadata if it's title or description
        if (name === 'title' || name === 'description') {
          Object.keys(newData.metadata).forEach((lang) => {
            newData.metadata[lang][name] = value
          })
        }
      }

      return newData
    })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const storageRef = ref(storage, `study_groups/${file.name}`)
      try {
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        setFormData((prevData) => ({
          ...prevData,
          image_url: url,
        }))
        alert(t('imageUploadedSuccessfully'))
      } catch (error) {
        console.error('Error uploading image: ', error)
        alert(t('errorUploadingImage'))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Start with the original data of the selected group
      const updatedData = { ...selectedGroup }

      // Iterate over the fields in formData
      Object.keys(formData).forEach((key) => {
        // If the value in formData is different from the original value, update it
        if (JSON.stringify(formData[key]) !== JSON.stringify(selectedGroup[key])) {
          updatedData[key] = formData[key]
        }
      })

      // Handle scheduled_at as Timestamp
      if (updatedData.scheduled_at && !(updatedData.scheduled_at instanceof Timestamp)) {
        updatedData.scheduled_at = Timestamp.fromDate(new Date(updatedData.scheduled_at))
      }

      // Ensure that title and description are updated in metadata
      if (updatedData.metadata) {
        Object.keys(updatedData.metadata).forEach((lang) => {
          updatedData.metadata[lang].title = updatedData.title
          updatedData.metadata[lang].description = updatedData.description
        })
      }

      // Remove fields that should not be updated
      delete updatedData.id
      delete updatedData.analytics

      await updateDoc(doc(db, 'study_groups', selectedGroup.id), updatedData)
      console.log('Study group updated successfully')
      alert(t('studyGroupUpdatedSuccessfully'))
      router.push(`/study-groups/${updatedData.slug || selectedGroup.id}`)
    } catch (error) {
      console.error('Error updating study group: ', error)
      alert(t('errorUpdatingStudyGroup'))
    }
  }

  const renderFormField = (key, value) => {
    if (key === 'id' || key === 'analytics') return null

    if (key === 'active') {
      return (
        <div key={key} className="mb-4">
          <label htmlFor={key} className="mb-2 block">
            {t(key)}
          </label>
          <select
            id={key}
            name={key}
            value={formData[key].toString()}
            onChange={(e) =>
              handleChange({ target: { name: key, value: e.target.value === 'true' } })
            }
            className="w-full rounded border p-2"
          >
            <option value="true">{t('true')}</option>
            <option value="false">{t('false')}</option>
          </select>
        </div>
      )
    }

    if (key === 'index') {
      return (
        <div key={key} className="mb-4">
          <label htmlFor={key} className="mb-2 block">
            {t(key)}
          </label>
          <input
            type="number"
            id={key}
            name={key}
            value={formData[key] || 0}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>
      )
    }

    if (key === 'scheduled_at') {
      return (
        <div key={key} className="mb-4">
          <label htmlFor={key} className="mb-2 block">
            {t(key)}
          </label>
          <input
            type="datetime-local"
            id={key}
            name={key}
            value={convertTimestampToDateTimeLocal(formData[key])}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>
      )
    }

    if (key === 'metadata') {
      return (
        <div key={key} className="mb-4">
          <label className="mb-2 block">{t(key)}</label>
          {Object.keys(value).map((lang) => (
            <div key={lang} className="mb-2">
              <h4>{lang}</h4>
              <input
                type="text"
                name={`metadata.${lang}.title`}
                value={formData.metadata[lang]?.title || ''}
                onChange={handleChange}
                placeholder="Title"
                className="mb-1 w-full rounded border p-2"
              />
              <textarea
                name={`metadata.${lang}.description`}
                value={formData.metadata[lang]?.description || ''}
                onChange={handleChange}
                placeholder="Description"
                className="w-full rounded border p-2"
              />
            </div>
          ))}
        </div>
      )
    }

    if (key === 'image_url') {
      return (
        <div key={key} className="mb-4">
          <label htmlFor={key} className="mb-2 block">
            {t(key)}
          </label>
          <input
            type="file"
            id={key}
            name={key}
            onChange={handleImageUpload}
            className="w-full rounded border p-2"
          />
          {formData[key] && (
            <img src={formData[key]} alt="Group image" className="mt-2 h-32 w-auto" />
          )}
        </div>
      )
    }

    // For other fields
    return (
      <div key={key} className="mb-4">
        <label htmlFor={key} className="mb-2 block">
          {t(key)}
        </label>
        <input
          type="text"
          id={key}
          name={key}
          value={formData[key] || ''}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{t('editStudyGroup')} - WEB3DEV</title>
      </Head>
      <div className="container mx-auto mt-8 px-4">
        <h1 className="mb-4 text-2xl font-bold">{t('editStudyGroup')}</h1>

        <div className="mb-4">
          <label htmlFor="groupSelect" className="block">
            {t('selectGroup')}
          </label>
          <select
            id="groupSelect"
            onChange={handleGroupSelect}
            className="w-full rounded border p-2"
          >
            <option value="">{t('selectGroup')}</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.index !== undefined ? `[${group.index}] ` : ''}
                {!group.active && `${t('[deactivated]')} - `}
                {group.title}
              </option>
            ))}
          </select>
        </div>

        {selectedGroup && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.entries(formData).map(([key, value]) => renderFormField(key, value))}
            <button
              type="submit"
              className="text-white rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              {t('updateStudyGroup')}
            </button>
          </form>
        )}
      </div>
    </>
  )
}

export default withProtected(EditStudyGroup)
