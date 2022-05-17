import { Translator } from "@src/core"
import en from '../../assets/i18n/en.json'
import fr from '../../assets/i18n/fr.json'
import ind from '../../assets/i18n/ind.json'
import ar from '../../assets/i18n/ar.json'

export const i18n = Translator.setup({
  resources: {
    en: {
      translation: en
    },
    fr: {
      translation: fr
    },
    ind: {
      translation: ind
    },
    ar: {
      translation: ar
    },
  },
  compatibilityJSON: 'v3', // fix issue i18next::pluralResolver: fallback to the compatibilityJSON v3 format handling. 
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  nsSeparator: false,
  keySeparator: false,
})
