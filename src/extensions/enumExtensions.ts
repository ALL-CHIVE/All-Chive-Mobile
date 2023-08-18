/**
 * 모든 Enum을 반환합니다.
 */
export const GetAll = <T extends Record<string, string>>(enumObj: T): string[] =>
  Object.keys(enumObj).map((key) => enumObj[key])

/**
 * 모든 Enum Key를 반환합니다.
 */
export const GetAllKeys = <T extends object>(enumObject: T): string[] => {
  return Object.keys(enumObject).filter((key) => isNaN(Number(key)))
}
