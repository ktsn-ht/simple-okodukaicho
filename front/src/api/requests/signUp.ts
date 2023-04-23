import { client } from './common/client';
import { postSignUpParams } from '../params/signUpParams';

export const postSignUp = (params: postSignUpParams) => {
  return client.post('/sign-up', params);
};
