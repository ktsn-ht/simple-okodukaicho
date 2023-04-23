import { FC, memo } from 'react';
import { Flex, Heading, useDisclosure } from '@chakra-ui/react';

import { HeaderButton } from '../../components/button/HeaderButton';
import { LoginModal } from '../../components/modal/LoginModal';
import { SignUpModal } from '../../components/modal/SignUpModal';
import { useRecoilValue } from 'recoil';
import { userState } from '../../store/userState';

export const Header: FC = memo(() => {
  const {
    isOpen: isOpenMyPage,
    onOpen: onOpenMyPage,
    onClose: onCloseMyPage,
  } = useDisclosure();

  const {
    isOpen: isOpenSignUp,
    onOpen: onOpenSignUp,
    onClose: onCloseSignUp,
  } = useDisclosure();

  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();

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
            <HeaderButton text={'マイページ'} onClick={onOpenMyPage} />
          ) : (
            <>
              <HeaderButton text={'新規登録'} onClick={onOpenSignUp} />
              <HeaderButton text={'ログイン'} onClick={onOpenLogin} />
            </>
          )}
        </Flex>
      </Flex>
      <SignUpModal isOpen={isOpenSignUp} onClose={onCloseSignUp} />
      <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin} />
    </>
  );
});
