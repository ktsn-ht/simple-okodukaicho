import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { getLogin } from '../api/requests/login';
import { Home } from '../pages/Home';
import { HeaderLayout } from '../pages/layout/HeaderLayout';
import { SignUp } from '../pages/SignUp';
import { Top } from '../pages/Top';
import { userState } from '../store/userState';

export const Router: FC = memo(() => {
  const setUserInfo = useSetRecoilState(userState);

  getLogin()
    .then((res) => {
      setUserInfo({
        loggedIn: true,
        userId: res.data.userId,
        email: res.data.email,
      });
    })
    .catch(() => {
      setUserInfo({ loggedIn: false, userId: '', email: '' });
    });

  return (
    <Routes>
      <Route path="/" element={<HeaderLayout children={<Top />} />} />
      <Route path="/home" element={<HeaderLayout children={<Home />} />} />
      <Route path="/sign-up" element={<HeaderLayout children={<SignUp />} />} />
      <Route path="*" element={<div>error</div>} />
    </Routes>
  );
});
