import { Sag } from '../models'
import { fetch } from '../odata'

export const getSag = (id: number): Promise<Sag | undefined> => {
  return fetch<Sag>(`/Sag?$filter=id eq ${id}`);
}