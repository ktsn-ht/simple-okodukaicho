import { postLoginParams } from '../params/loginParams';
import { client } from './common/client';

export const postLogin = (params: postLoginParams) => {
  return client.post('/login', params, { withCredentials: true });
};
