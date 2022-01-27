import { BACKEND_URL } from './config';

export const GetAllInfos = async () => {
  return fetch(`${BACKEND_URL}/getAllInfos`, {
    method: 'GET',
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    return data;
  });
}

export const AddTag = async (value: string, label: string) => {
  return fetch(`${BACKEND_URL}/addTag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      value,
      label
    })
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    return data;
  });
}