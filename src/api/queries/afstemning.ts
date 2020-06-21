import { Afstemning } from '../models'
import { fetch, fetchMultiple } from '../odata'

export const getAfstemning = (id: number) => {
  return fetch<Afstemning>(`/Afstemning?$filter=id eq ${id}`);
}

export const getAfstemningerFromThisYear = () => {
  return fetchMultiple<Afstemning>(`/Afstemning?$filter=opdateringsdato gt DateTime'2020-03-01T09:13:28'`);
}