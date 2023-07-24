export interface BlockResponse {
  nickname: string
}

export interface BlockListResponse {
  users: UserData[]
}

export interface UserData {
  nickname: string
  id: number
}
