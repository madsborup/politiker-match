import { Stemme } from '../models'
import { fetchMultiple } from '../odata'

//a bit hacky solution for the query, but odata v3 doesn't support 'in' queries
export const getStemmerWithAfstemningsId = (ids: number[]) => {
  const query = ids.map(id => {
    return `afstemningid eq ${id}`
  }).join(' or ');
  return fetchMultiple<Stemme>(`/Stemme?$filter=${query}`);
}