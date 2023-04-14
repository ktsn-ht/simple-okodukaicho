import { FC, memo } from 'react';

import { Button, Flex, Heading, Link, useDisclosure } from '@chakra-ui/react';

import { LoginModal } from '../../components/LoginModal';

export const Header: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Button
          color={'white'}
          bg={'cyan.600'}
          mr={'1vw'}
          fontSize={'sm'}
          _hover={{ bg: 'cyan.500' }}
          onClick={onOpen}
        >
          ログイン
        </Button>
      </Flex>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </>
  );
});
