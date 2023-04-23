import { ChangeEvent, FC, memo, useState } from 'react';
import {
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

import { ModalButton } from '../button/ModalButton';
import { useEnterKey } from '../../hooks/useEnterKey';
import { useLogin } from '../../hooks/useLogin';

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

  const { login } = useLogin();
  const { pressEnterKey } = useEnterKey();

  const onClickLogin = () =>
    login({ userId: userId, password: password, onClose: onClose });

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
              <FormLabel>ユーザーID または メールアドレス</FormLabel>
              <Input value={userId} onChange={onChangeUserId} />
            </FormControl>
            <FormControl>
              <FormLabel>パスワード</FormLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={onChangePassword}
                onKeyPress={(e) =>
                  pressEnterKey({ event: e, process: onClickLogin })
                }
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
            <ModalButton text={'ログイン'} onClick={onClickLogin} />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
