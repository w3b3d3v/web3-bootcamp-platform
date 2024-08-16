import React, { useState } from 'react'
import { withProtected } from '../../hooks/route'
import { useRouter } from 'next/router'
import { db, storage } from '../../firebase/initFirebase'
import { collection, addDoc } from 'firebase/firestore'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

function CreateStudyGroup({ user }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Beginner',
    language: 'pt',
    scheduled_at: '',
    leader_discord_id: '',
    image_url: '',
    active: true,
    index: 0,
  })
  const router = useRouter()
  const { t } = useTranslation()

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image_url' && files.length > 0) {
      const file = files[0]
      const storageRef = ref(storage, `study_groups/${file.name}`)
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((url) => {
          setFormData((prevData) => ({
            ...prevData,
            image_url: url,
          }))
        })
      })
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const slug = formData.title.toLowerCase().replace(/ /g, '-')
    try {
      const docRef = await addDoc(collection(db, 'study_groups'), {
        ...formData,
        scheduled_at: new Date(formData.scheduled_at),
        slug: slug,
      })
      console.log('Study group added with ID: ', docRef.id)
      router.push(`/study-groups/${slug}`)
    } catch (error) {
      console.error('Error adding study group: ', error)
    }
  }

  return (
    <>
      <Head>
        <title>{t('createStudyGroup')} - WEB3DEV</title>
      </Head>
      <div className="container mx-auto mt-8 px-4">
        <h1 className="mb-4 text-2xl font-bold">{t('createStudyGroup')}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block">
              {t('title')}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="block">
              {t('description')}
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
            ></textarea>
          </div>
          <div>
            <label htmlFor="difficulty" className="block">
              {t('difficulty')}
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full rounded border p-2"
            >
              <option value="Beginner">{t('beginner')}</option>
              <option value="Intermediate">{t('intermediate')}</option>
              <option value="Advanced">{t('advanced')}</option>
            </select>
          </div>
          <div>
            <label htmlFor="language" className="block">
              {t('language')}
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
            />
          </div>
          <div>
            <label htmlFor="scheduled_at" className="block">
              {t('scheduledAt')}
            </label>
            <input
              type="datetime-local"
              id="scheduled_at"
              name="scheduled_at"
              value={formData.scheduled_at}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
            />
          </div>
          <div>
            <label htmlFor="leader_discord_id" className="block">
              {t('leaderDiscordId')}
            </label>
            <input
              type="text"
              id="leader_discord_id"
              name="leader_discord_id"
              value={formData.leader_discord_id}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>
          <div>
            <label htmlFor="image_url" className="block">
              {t('imageUrl')}
            </label>
            <input
              type="file"
              id="image_url"
              name="image_url"
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
            />
          </div>
          <div>
            <label htmlFor="index" className="block">
              {t('index')}
            </label>
            <input
              type="number"
              id="index"
              name="index"
              value={formData.index}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
            />
          </div>
          <button
            type="submit"
            className="text-white rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
          >
            {t('createStudyGroup')}
          </button>
        </form>
      </div>
    </>
  )
}

export default withProtected(CreateStudyGroup)
