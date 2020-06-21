import axios from 'axios';
import { SERVER_URL } from './constants';
import { resolve } from 'dns';

export type odataPayload<T> = {
  'odata.metadata': string
  'odata.nextLink'?: string
  value: T
}

const handlePagination = async <T>(path: string, result: T[]): Promise<T[]> => {
  const response = await axios.get(path);
  const data: odataPayload<T[]> = await response.data;

  if (data["odata.nextLink"]) {
    return result = result.concat(await handlePagination(data["odata.nextLink"], data.value));
  }
  else {
    return [...result, ...data.value];
  }
}

export const fetch = async <T>(path: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}${path}`);
    const data: odataPayload<T[]> = await response.data;

    if (data.value) {
      return data.value[0]
    }
  } catch (e) {
    console.log(e);
  }
}

//Odata will start paginating result in a nextLink property if payload object has more than 100 elements. 
//Handled by recursively fetching from nextLink.
export const fetchMultiple = async <T>(path: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}${path}`);
    const data: odataPayload<T[]> = await response.data;
    const value = data.value

    if (value) {
      if (data["odata.nextLink"] && value instanceof Array) {
        return handlePagination<T>(data["odata.nextLink"], value)
      }

      return value;
    }
  } catch (e) {
    console.log(e);
  }
};