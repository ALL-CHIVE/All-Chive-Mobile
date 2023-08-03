export interface GetTagResponse {
  data: {
    tags: Tag[]
  }
}

export interface Tag {
  tagId: number
  name: string
}
