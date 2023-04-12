import { FC, memo, ReactNode } from 'react';

import { Header } from '../common/Header';

type Props = {
  childlen: ReactNode;
};

export const HeaderLayout: FC<Props> = memo((props) => {
  const { childlen } = props;
  return (
    <>
      <Header />
      {childlen}
    </>
  );
});
