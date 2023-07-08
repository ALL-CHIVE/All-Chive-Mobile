import { atom } from 'recoil'

export const subjectState = atom<string>({ key: 'subjectState', default: 'true' })
