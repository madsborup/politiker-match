import { Sagstrin } from '../models'
import { fetch, fetchMultiple } from '../odata'

export const getSagtrin = (id: number) => {
  return fetch<Sagstrin>(`/Sagstrin?$filter=id eq ${id}`);
}

/*
Sagstrin with types that are up for vote

id  type
--  ----
7   2. behandling
12  1. behandling
15  2. behandling
17  3. behandling
23  1. behandling
39  Forslag som fremsat
42  Forslag som vedtaget
87  1. (eneste) behandling
*/

//get sagstrin from a year ago until now 
//a bit hacky solution for the query, but odata v3 doesn't support 'in' queries
export const getSagstrinFromThisYear = () => {
  const sagTypeIds = [7, 12, 15, 17, 23, 39, 42, 87]
  const query = sagTypeIds.map(sagTypeId => {
    return `typeid eq ${sagTypeId}`
  }).join(' or ');
  const currentDate = new Date();

  return fetchMultiple<Sagstrin>(`/Sagstrin?$filter=dato gt DateTime'2020-03-01T09:13:28' and (${query})`);
}