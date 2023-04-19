import { client } from './common/client';
import { postLoginParams } from '../params/loginParams';

export const getLogin = () => {
  return client.get('/login');
};

export const postLogin = (params: postLoginParams) => {
  return client.post('/login', params);
};
