import { atom } from 'recoil'

import { GetSubjects } from '@/models/enums/Subject'

export const SubjectListState = atom<string[]>({
  key: 'subjectListState',
  default: GetSubjects(),
})
