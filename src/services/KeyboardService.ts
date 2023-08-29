import { Keyboard, KeyboardEventListener } from 'react-native'

/**
 * keyboardListener
 */
export const keyboardListener = (
  keyboardDidShow: KeyboardEventListener,
  keyboardDidHide: KeyboardEventListener
) => {
  const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
  const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

  return () => {
    keyboardDidShowListener.remove()
    keyboardDidHideListener.remove()
  }
}
