import { client } from './common/client';
import { postLoginParams } from '../params/loginParams';

export const postLogin = (params: postLoginParams) => {
  return client.post('/login', params, { withCredentials: true });
};
