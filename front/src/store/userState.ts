import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: { loggedIn: false, userId: '', email: '' },
});
