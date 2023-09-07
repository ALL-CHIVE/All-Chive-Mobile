import { marketing, privacy, terms } from '@/const/Const'
import { AgreementType } from '@/models/enums/AgreementType'

import { openInappBrowser } from './InappBrowser'

/**
 * 해당하는 마케팅 브라우저를 엽니다.
 */
export const openAgreementBrowser = (key: string) => {
  switch (key) {
    case AgreementType.terms:
      openInappBrowser(terms)
      break
    case AgreementType.privacy:
      openInappBrowser(privacy)
      break
    case AgreementType.marketing:
      openInappBrowser(marketing)
      break
  }
}
