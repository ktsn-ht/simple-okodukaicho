import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HeaderLayout } from '../pages/layout/HeaderLayout';
import { Top } from '../pages/Top';

export const Router: FC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<HeaderLayout childlen={<Top />} />} />
      <Route path="*" element={<div>error</div>} />
    </Routes>
  );
});
