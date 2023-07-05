import { atom } from 'recoil'

export const topicState = atom<string>({ key: 'topicState', default: 'true' })
