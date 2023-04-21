import { Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { HeaderButton } from '../../components/HeaderButton';
import { LoginModal } from '../../components/LoginModal';
import { useRecoilValue } from 'recoil';
import { userState } from '../../store/userState';

export const Header: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userInfo = useRecoilValue(userState);
  const loggedIn = userInfo ? userInfo.loggedIn : false;

  return (
    <>
      <Flex
        as={'nav'}
        w={'100vw'}
        bg={'cyan.800'}
        color={'White'}
        align={'center'}
        justify={'space-between'}
        padding={{ base: 3, md: 5 }}
      >
        <Flex as={'a'} align={'center'} _hover={{ cursor: 'pointer' }}>
          <Heading as={'h1'} fontSize={{ base: 'md', md: 'lg' }}>
            シンプルおこづかい帳
          </Heading>
        </Flex>
        <Flex>
          {loggedIn ? (
            <HeaderButton text={'マイページ'} onClick={() => {}} />
          ) : (
            <>
              <HeaderButton text={'ユーザー登録'} onClick={() => {}} />
              <HeaderButton text={'ログイン'} onClick={onOpen} />
            </>
          )}
        </Flex>
      </Flex>
      {!loggedIn && <LoginModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
});
