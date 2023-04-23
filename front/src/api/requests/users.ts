import { client } from './common/client';
import { postUsersParams } from '../params/usersParams';

export const postUsers = (params: postUsersParams) => {
  return client.post('/users', params);
};
