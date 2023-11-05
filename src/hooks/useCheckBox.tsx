import { useState } from 'react'

/**
 * useCheckBox
 */
const useCheckBox = (checkBoxList: Record<string, boolean>) => {
  const [allCheck, setAllCheck] = useState(false)
  const [checkBox, setCheckBox] = useState(checkBoxList)

  /**
   * 체크박스를 토글합니다.
   */
  const toggleCheckBox = (key: keyof typeof checkBox) => {
    const newCheckBox = {
      ...checkBox,
      [key]: !checkBox[key] as boolean,
    }

    setCheckBox(newCheckBox)
    setAllCheck(!Object.values(newCheckBox).includes(false))
  }

  /**
   * 모든 체크박스를 활성화 or 비활성화 합니다.
   */
  const toggleAllCheckBox = () => {
    for (const key in checkBox) {
      checkBox[key] = !allCheck
    }

    setAllCheck((prev) => !prev)
  }

  return {
    allCheck,
    checkBox,
    toggleCheckBox,
    toggleAllCheckBox,
  }
}

export default useCheckBox
