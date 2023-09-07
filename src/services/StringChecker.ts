/**
 * checkNickname
 */
export const checkNickname = (nickname: string) => {
  const regex = /^[가-힣a-zA-Z0-9]{1,10}$/
  return regex.test(nickname)
}

/**
 * checkTag
 */
export const checkTag = (tag: string) => {
  const regex = /^[가-힣a-zA-Z]{1,20}$/
  return regex.test(tag)
}

/**
 * checkTitle
 */
export const checkTitle = (title: string) => {
  console.log(title)
  const regex = /^[\p{L}\p{M}\p{Z}\p{S}]{1,15}$/u
  return regex.test(title)
}
