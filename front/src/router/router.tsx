import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HeaderLayout } from '../pages/layout/HeaderLayout';
import { Home } from '../pages/Home';
import { SignUp } from '../pages/SignUp';
import { Top } from '../pages/Top';
import { getLogin } from '../api/requests/login';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/userState';

export const Router: FC = memo(() => {
  const setUserInfo = useSetRecoilState(userState);

  // getLogin()
  //   .then((res) => {
  //     setUserInfo({ loggedIn: true, userId: res.data.userId });
  //   })
  //   .catch(() => {
  //     setUserInfo({ loggedIn: false, userId: '' });
  //   });

  return (
    <Routes>
      <Route path="/" element={<HeaderLayout childlen={<Top />} />} />
      <Route path="/home" element={<HeaderLayout childlen={<Home />} />} />
      <Route path="/sign-up" element={<HeaderLayout childlen={<SignUp />} />} />
      <Route path="*" element={<div>error</div>} />
    </Routes>
  );
});
