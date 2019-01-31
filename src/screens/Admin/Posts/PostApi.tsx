import { generateData } from '../../../utils/dummy';

let data = generateData(['title', 'content', 'image_url', 'category', 'author', 'created_at']);

export const postPost = payload => {
  data.unshift({ ...payload, id: data.length + 1 });

  return Promise.resolve({
    result: payload
  });
};

export const putPost = payload => {
  data = data.map(e => {
    if (e.id === Number(payload.id)) {
      return { ...e, ...payload };
    } else {
      return e;
    }
  });

  return Promise.resolve({
    result: payload
  });
};

export const getPostById = id => {
  return Promise.resolve({
    result: data.find(e => e.id == id)
  });
};

export const getPosts = (payload?) => {
  return Promise.resolve({
    result: data
  });
};

export const deletePostById = id => {
  data = data.filter(e => e.id !== id);

  return Promise.resolve({
    result: { deleted: true }
  });
};
