import React, { useState } from 'react'

import { login, logout } from '@react-native-seoul/kakao-login'
import { Button } from 'react-native'

/**
 *
 */
export const Login = () => {
  const [signIn, setSignIn] = useState(false)
  /**
   *
   */
  const signInWithKakao = async (): Promise<void> => {
    try {
      const data = await login()
      console.log(JSON.stringify(data))
      console.log(data)
      setSignIn(true)
    } catch (err) {
      console.log(err)
    }
  }

  /**
   *
   */
  const signOutWithKakao = async (): Promise<void> => {
    try {
      await logout()
      setSignIn(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {signIn ? (
        <Button
          title="logout"
          onPress={signOutWithKakao}
        />
      ) : (
        <Button
          title="Kakao"
          onPress={signInWithKakao}
        />
      )}
    </>
  )
}
