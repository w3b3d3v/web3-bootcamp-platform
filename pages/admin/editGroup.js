import React, { useState, useEffect } from 'react'
import { withProtected } from '../../hooks/route'
import { useRouter } from 'next/router'
import { db, storage } from '../../firebase/initFirebase'
import { collection, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

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
    setGroups(groupsData)
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
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
      const updatedData = { ...formData }
      if (updatedData.scheduled_at) {
        updatedData.scheduled_at = Timestamp.fromDate(new Date(updatedData.scheduled_at))
      }

      await updateDoc(doc(db, 'study_groups', selectedGroup.id), updatedData)
      console.log('Study group updated successfully')
      alert(t('studyGroupUpdatedSuccessfully'))
      router.push(`/study-groups/${updatedData.slug || updatedData.id}`)
    } catch (error) {
      console.error('Error updating study group: ', error)
      alert(t('errorUpdatingStudyGroup'))
    }
  }

  const renderFormField = (key, value) => {
    if (key === 'id') return null // Não renderizar o campo 'id'
    if (key === 'analytics') return null // Não renderizar o campo 'id'

    let inputType = 'text'
    if (typeof value === 'number') inputType = 'number'
    if (value instanceof Date) inputType = 'datetime-local'

    if (key === 'image_url') {
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
            className="mb-2 w-full rounded border p-2"
            readOnly
          />
          <input
            type="file"
            id="image_upload"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label
            htmlFor="image_upload"
            className="text-white cursor-pointer rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
          >
            {t('editImage')}
          </label>
        </div>
      )
    }

    return (
      <div key={key} className="mb-4">
        <label htmlFor={key} className="mb-2 block">
          {t(key)}
        </label>
        <input
          type={inputType}
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
