import { useState } from 'react'

import { AgreementInfo } from '@/models/AgreementInfo'

/**
 * useAgreement
 */
const useAgreement = () => {
  const [allCheck, setAllCheck] = useState(false)
  const [agreements, setAgreements] = useState<AgreementInfo>({
    terms: false,
    privacy: false,
    marketing: false,
  })

  /**
   * 체크박스를 토글합니다.
   */
  const toggleCheckBox = (key: keyof typeof agreements) => {
    const newAgreement = {
      ...agreements,
      [key]: !agreements[key] as boolean,
    }

    setAgreements(newAgreement)
    setAllCheck(!Object.values(newAgreement).includes(false))
  }

  /**
   * 모든 체크박스를 활성화 or 비활성화 합니다.
   */
  const toggleAllCheckBox = () => {
    setAgreements({
      terms: !allCheck,
      privacy: !allCheck,
      marketing: !allCheck,
    })
    setAllCheck((prev) => !prev)
  }

  return {
    allCheck,
    agreements,
    toggleCheckBox,
    toggleAllCheckBox,
  }
}

export default useAgreement
