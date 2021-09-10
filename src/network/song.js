import { request } from "./request";

export function getSongLyric({ id }) {
  return request({
    url: `/lyric?id=${id}`,
  })
}

export function getSimiSong({ id }) {
  return request({
    url: `/simi/song?id=${id}`,
  })
}