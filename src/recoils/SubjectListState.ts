import { atom } from 'recoil'

import { GetAllSubject, GetSubjects } from '@/models/enums/Subject'

export const SubjectListState = atom<string[]>({
  key: 'subjectListState',
  default: GetSubjects(),
})

export const AllSubjectListState = atom<string[]>({
  key: 'allSubjectListState',
  default: GetAllSubject(),
})
