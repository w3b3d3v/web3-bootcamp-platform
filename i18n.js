import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const queryParameterLangDetector = {
  name: 'queryParameterLangDetector',

  lookup(options) {
    let found
    if (typeof window !== 'undefined') {
      const query = window.location.search.substring(1)
      const params = query.split('&').reduce((acc, element) => {
        const [key, value] = element.split('=')
        acc[key] = value
        return acc
      }, {})

      if (params[options.lookupQuerystring]) {
        found = params[options.lookupQuerystring]
      }
    }
    return found
  },

  cacheUserLanguage(lng, options) {
    console.log('Set language to ' + lng)
    if (options.lookupLocalStorage && typeof window !== 'undefined') {
      window.localStorage.setItem(options.lookupLocalStorage, lng)
    }
  },
}

import pt from './public/locales/pt/translation.json'
import en from './public/locales/en/translation.json'

const resource = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resource,
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['queryParameterLangDetector', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      checkWhitelist: true, // Ensure the detected language is in the whitelist
    },
    whitelist: Object.keys(resource),
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
