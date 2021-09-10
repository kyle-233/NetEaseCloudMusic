import { request } from "./request";


export function getComment({ type, id, pageSize = 20, sortType = 2, pageNo }) {
  return request({
    url: `/comment/new?type=${type}&id=${id}&pageSize=${pageSize}&sortType=${sortType}&pageNo=${pageNo}`,
  })
}