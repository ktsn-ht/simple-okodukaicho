import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Stack
} from '@chakra-ui/react';
import { ChangeEvent, FC, memo, useState } from 'react';

import { postLogin } from '../api/requests/login';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal: FC<Props> = memo((props) => {
  const { isOpen, onClose } = props;

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const onChangeShowPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setShowPassword(e.target.checked);

  const onClickLogin = () => {
    postLogin({ userId: userId, password: password })
      .then((res) => {
        console.log(res.status);
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={'sm'}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pt={2} pb={2}>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>ユーザーID</FormLabel>
              <Input value={userId} onChange={onChangeUserId} />
            </FormControl>
            <FormControl>
              <FormLabel>パスワード</FormLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={onChangePassword}
              />
              <Checkbox
                pt={2}
                pl={2}
                size={'sm'}
                isChecked={showPassword}
                onChange={onChangeShowPassword}
              >
                パスワードを表示する
              </Checkbox>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Flex w={'100vw'} align={'center'} justify={'center'}>
            <Button
              color={'white'}
              bg={'cyan.600'}
              mr={'1vw'}
              fontSize={'sm'}
              _hover={{ bg: 'cyan.500' }}
              onClick={onClickLogin}
            >
              ログイン
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
