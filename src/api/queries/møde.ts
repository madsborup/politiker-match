import { Afstemning } from '../models'
import { fetch } from '../odata'

export const getAfstemninger = () => {
  return fetch<Afstemning[]>("/Afstemning?$filter=");
}