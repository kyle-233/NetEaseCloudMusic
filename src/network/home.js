import { request } from "./request";


export function getSongUrl({ id }) {
  return request({
    url: `/song/url?id=${id}`
  })
}

export function getSongDetail({ id }) {
  return request({
    url: `/song/detail?ids=${id}`
  })
}