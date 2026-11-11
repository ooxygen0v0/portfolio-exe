import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ko from './locales/ko.json'
import en from './locales/en.json'
import ja from './locales/ja.json'

// STEP 13-B에서 추가한 번역 파일
import koExtra from './locales/ko-extra.json'
import enExtra from './locales/en-extra.json'
import jaExtra from './locales/ja-extra.json'

const supportedLanguages = ['ko', 'en', 'ja']

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem('portfolio-language')

    if (supportedLanguages.includes(saved)) {
      return saved
    }
  } catch {
    // 저장소를 사용할 수 없는 경우
  }

  const browserLanguage = navigator.language
    .split('-')[0]
    .toLowerCase()

  return supportedLanguages.includes(browserLanguage)
    ? browserLanguage
    : 'ko'
}

const initialLanguage = getInitialLanguage()

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: {
        translation: { ...ko, ...koExtra },
      },
      en: {
        translation: { ...en, ...enExtra },
      },
      ja: {
        translation: { ...ja, ...jaExtra },
      },
    },
    lng: initialLanguage,
    fallbackLng: 'ko',
    supportedLngs: supportedLanguages,
    interpolation: {
      escapeValue: false,
    },
  })

document.documentElement.lang = initialLanguage

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language

  try {
    localStorage.setItem('portfolio-language', language)
  } catch {
    // 저장 실패 시에도 언어 전환은 유지
  }
})

export default i18n
