import { useState } from 'react'

import { useMutation } from 'react-query'

import { checkNicknameValid } from '@/apis/user/User'
import { checkNickname } from '@/services/StringChecker'

import useText from './useText'

/**
 * 닉네임 중복 및 유효 여부를 체크합니다.
 */
const useNicknameCheck = () => {
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false)
  const {
    text: nickname,
    isValid: isNicknameValid,
    updateText: updateNickname,
    clearText: clearNickname,
  } = useText(checkNickname)

  const { mutate: nicknameDuplicationCheckMutate } = useMutation(checkNicknameValid, {
    /**
     * onSuccess
     */
    onSuccess: () => {
      setIsNicknameDuplicate(true)
    },

    /**
     * onError
     */
    onError: () => {
      setIsNicknameDuplicate(false)
    },
  })

  /**
   * 닉네임 업데이트 및 유효성을 검사합니다.
   */
  const handleChangeNickname = (nickname: string) => {
    updateNickname(nickname)

    if (nickname) {
      nicknameDuplicationCheckMutate(nickname)
    } else {
      setIsNicknameDuplicate(false)
    }
  }

  /**
   * 닉네임을 초기화 합니다.
   */
  const handleClearNickname = () => {
    clearNickname()
    setIsNicknameDuplicate(false)
  }

  return {
    nickname,
    isNicknameValid,
    isNicknameDuplicate,
    handleChangeNickname,
    handleClearNickname,
  }
}

export default useNicknameCheck
