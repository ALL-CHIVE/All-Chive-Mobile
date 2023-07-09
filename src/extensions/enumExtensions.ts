/**
 * 모든 Enum을 반환합니다.
 */
export const GetAll = <T extends Record<string, string>>(enumObj: T): string[] =>
  Object.keys(enumObj).map((key) => enumObj[key])
