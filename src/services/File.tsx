import config from '../config';

// Upload to server
export const uploadFile = file => {
  const data = new FormData();
  data.append('file', file);

  return fetch(`/api/file`, {
    method: 'POST',
    body: data
  }).then(res => res.json());
};
