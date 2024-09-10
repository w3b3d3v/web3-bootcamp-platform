import React, { useState } from 'react'
import { withProtected } from '../../hooks/route'
import { useRouter } from 'next/router'
import { db, storage } from '../../firebase/initFirebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

function CreateStudyGroup({ user }) {
  const [formData, setFormData] = useState({
    language: '',
    leader_discord_id: '',
    scheduled_at: '',
    image_url: '',
    difficulty: 'beginner',
    active: true,
    index: 0,
  })

  const [tempLanguageData, setTempLanguageData] = useState({
    title: '',
    description: '',
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
    } else if (name === 'title' || name === 'description') {
      setTempLanguageData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // Garante que isso seja chamado primeiro

    if (!formData.language) {
      alert(t('pleaseSelectLanguage'))
      return
    }

    if (!formData.image_url) {
      alert(t('pleaseWaitForImageUpload'))
      return
    }

    const slug = tempLanguageData.title.toLowerCase().replace(/ /g, '-')

    try {
      const finalFormData = {
        ...formData,
        scheduled_at: Timestamp.fromDate(new Date(formData.scheduled_at)),
        slug: slug,
        index: parseInt(formData.index, 10),
        title: tempLanguageData.title,
        description: tempLanguageData.description,
        metadata: {
          [formData.language]: {
            title: tempLanguageData.title,
            description: tempLanguageData.description,
          },
        },
      }
      const docRef = await addDoc(collection(db, 'study_groups'), finalFormData)
      console.log('Study group added with ID: ', docRef.id)
      alert(t('studyGroupCreatedSuccessfully')) // Adiciona feedback de sucesso
      router.push(`/study-groups/${slug}`)
    } catch (error) {
      console.error('Error adding study group: ', error)
      alert(t('errorCreatingStudyGroup')) // Adiciona feedback de erro
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
            <label htmlFor="language" className="block">
              {t('language')}
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
            >
              <option value="">{t('selectLanguage')}</option>
              <option value="en">English</option>
              <option value="pt-BR">Português</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div>
            <label htmlFor="title" className="block">
              {t('title')}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={tempLanguageData.title}
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
              value={tempLanguageData.description}
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
              <option value="beginner">{t('beginner')}</option>
              <option value="intermediate">{t('intermediate')}</option>
              <option value="advanced">{t('advanced')}</option>
            </select>
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
            disabled={formData.language === ''} // Desabilita o botão se nenhuma linguagem for selecionada
          >
            {t('createStudyGroup')}
          </button>
        </form>
      </div>
    </>
  )
}

export default withProtected(CreateStudyGroup)
