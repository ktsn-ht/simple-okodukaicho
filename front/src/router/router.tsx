import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HeaderLayout } from '../pages/layout/HeaderLayout';
import { Home } from '../pages/Home';
import { Top } from '../pages/Top';

export const Router: FC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<HeaderLayout childlen={<Top />} />} />
      <Route path="/home" element={<HeaderLayout childlen={<Home />} />} />
      <Route path="*" element={<div>error</div>} />
    </Routes>
  );
});
