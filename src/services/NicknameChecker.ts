/**
 * checkNickname
 */
export const checkNickname = (nickname: string) => {
  const regex = /^[가-힣a-zA-Z0-9]{1,20}$/
  return regex.test(nickname)
}
