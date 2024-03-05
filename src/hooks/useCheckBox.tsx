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
   * 하나의 체크박스만 선택합니다.
   */
  const selectOne = (key: keyof typeof checkBox) => {
    clearAll()

    const newCheckBox = {
      ...checkBox,
      [key]: !checkBox[key] as boolean,
    }

    setCheckBox(newCheckBox)
  }

  /**
   * 선택을 초기화합니다.
   */
  const clearAll = () => {
    for (const key in checkBox) {
      checkBox[key] = false
    }
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
    selectOne,
  }
}

export default useCheckBox
