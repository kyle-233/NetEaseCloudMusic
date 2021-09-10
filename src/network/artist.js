import { request } from "./request";

export function getHotArtists() {
  return request({
    // url: `/top/artists?offset=${offset}&limit=${limit}`,
    url: `/top/artists?offset=0&limit=30`,
  })
};

export function getArtists({ type, area, initial = -1, limit = 50 }) {
  return request({
    url: `/artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}`,
  })
}

export function getArtistInfo({ id }) {
  return request({
    url: `/artist/detail?id=${id}`,
  })
}

export function getArtistHotSong({ id }) {
  return request({
    url: `/artist/top/song?id=${id}`,
  })
}

export function getSimiArtsits({ id }) {
  return request({
    url: `/simi/artist?id=${id}`
  })
}

export function getArtistAlbum({ id, offset = 0, limit = 30 }) {
  return request({
    url: `/artist/album?id=${id}&offset=${offset}&limit=${limit}`
  })
}