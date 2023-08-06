import axios from 'axios'

export interface MetaData {
  [key: string]: string
}

/**
 * getLinkImage
 */
export const getLinkImage = async (uri: string) => {
  try {
    const { data } = await fetchHtml(uri)
    const meta = await parseHtml(data as string)
    return meta['image']
  } catch (e) {
    console.log(e)
    return ''
  }
}

/**
 * getLinkOgTags
 */
export const getLinkOgTags = async (uri: string) => {
  try {
    const { data } = await fetchHtml(uri)
    const meta = await parseHtml(data as string)
    return meta
  } catch (e) {
    console.log(e)
    return
  }
}

/**
 * html을 파싱합니다.
 */
const parseHtml = (html: string) => {
  const metaTagOGRegex =
    /<meta[^>]*(?:property=[ '"]*og:([^'"]*))?[^>]*(?:content=["]([^"]*)["])?[^>]*>/gi
  const matches = html.match(metaTagOGRegex)
  const meta: MetaData = {}

  if (matches) {
    const metaPropertyRegex = /<meta[^>]*property=[ "]*og:([^"]*)[^>]*>/i
    const metaContentRegex = /<meta[^>]*content=[ "]([^"]*)[^>]*>/i
    matches.forEach((m) => {
      const propertyMatch = metaPropertyRegex.exec(m)
      if (propertyMatch) {
        const property = metaPropertyRegex.exec(propertyMatch[0])
        const content = metaContentRegex.exec(propertyMatch[0])
        if (property && content) {
          meta[property[1]] = content[1]
        }
      }
    })
  }

  return meta
}

/**
 * html을 가져옵니다.
 */
const fetchHtml = async (link: string) => {
  return await axios.get(link)
}
