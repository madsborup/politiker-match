import { MF } from '../models'
import { fetch } from '../odata'

export const getAllMF = () => {
  return fetch<MF[]>("/Aktør?$filter=typeid eq 5");
}