import { request } from "./request";

export function getbanners() {
  return request({
    url: '/banner',
  })
}

export function getplaylist({ limit }) {
  return request({
    url: `/top/playlist?limit=${limit}`,
  })
}

export function getnewalbum({ limit }) {
  return request({
    url: `/top/album?limit=${limit}`,
  })
}

export function gettoplist() {
  return request({
    url: `/toplist`,
  })
}

export function gettoplistEach({ id }) {
  return request({
    url: `/playlist/detail?id=${id}`,
  })
}