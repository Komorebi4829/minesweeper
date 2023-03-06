import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translation_zhCN from './locales/zh_CN'
import translation_enUS from './locales/en_US'
import { initLang } from '@/config'

const resources = {
  en_US: {
    translation: translation_enUS,
  },
  zh_CN: {
    translation: translation_zhCN,
  },
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: initLang,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
