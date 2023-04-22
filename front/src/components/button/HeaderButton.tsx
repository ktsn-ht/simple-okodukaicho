import { FC, memo } from 'react';

import { Button } from '@chakra-ui/react';

type Props = {
  text: string;
  onClick: () => void;
};

export const HeaderButton: FC<Props> = memo((props) => {
  const { text, onClick } = props;

  return (
    <Button
      color={'white'}
      bg={'cyan.600'}
      mr={'1vw'}
      fontSize={'sm'}
      _hover={{ bg: 'cyan.500' }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
});
