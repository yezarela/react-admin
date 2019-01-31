// import config from '../../../config';
import { generateData } from '../../../utils/dummy';

export const getUsers = (payload?) => {
  return Promise.resolve({
    result: generateData(['email', 'first_name', 'last_name', 'created_at'])
  });
};
