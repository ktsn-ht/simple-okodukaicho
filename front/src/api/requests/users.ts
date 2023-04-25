import { postUsersParams, putUsersParams } from '../params/usersParams';

import { client } from './common/client';

export const postUsers = (params: postUsersParams) => {
  return client.post('/users', params);
};

export const putUsers = (params: putUsersParams) => {
  return client.put('/users', params);
};
