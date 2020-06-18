import { Sagstrin } from '../models'
import { fetchMultiple } from '../odata'

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
export const getSagstrinFromThisYear = () => {
  const currentDate = new Date();
  return fetchMultiple<Sagstrin>("/Sagstrin?$filter=dato gt DateTime'2020-03-01T09:13:28' and (typeid eq 7 or typeid eq 12)");
}