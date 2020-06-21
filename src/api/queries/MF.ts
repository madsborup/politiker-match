import { MF } from '../models'
import { fetch, fetchMultiple } from '../odata'

export const getMFsWithId = (ids: number[]) => {
  const query = ids.map(id => {
    return `id eq ${id}`
  }).join(' or ');
  return fetchMultiple<MF>(`/Aktør?$filter=${query}`);
}

export const getMF = (id: number) => {
  return fetch<MF>(`/Aktør?$filter=id eq ${id}`);
}