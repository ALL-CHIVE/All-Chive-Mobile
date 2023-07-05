import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ko from './ko.json'

const resources = {
  ko: {
    translation: ko,
  },
}

i18n.use(initReactI18next).init({
  resources: resources, // 현재 사용할 언어 모듈
  lng: 'ko', // 앱에서 사용할 기본언어 설정
  fallbackLng: 'ko', // lng를 사용할수 없을때 기본언어
  supportedLngs: ['ko'], // 허용할 언어배열
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false, // XSS 주입을 피하기 위해 설정
  },
})

export default i18n
