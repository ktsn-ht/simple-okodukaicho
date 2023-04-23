import { ChangeEvent, FC, memo, useState } from 'react';
import {
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
import { useSignUp } from '../../hooks/useSignUp';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SignUpModal: FC<Props> = memo((props) => {
  const { isOpen, onClose } = props;

  const [email, setEmail] = useState('');

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const { signUp } = useSignUp();
  const { pressEnterKey } = useEnterKey();

  const onClickSignUp = () => signUp({ email: email, onClose: onClose });

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
              <FormLabel>メールアドレス</FormLabel>
              <Input
                value={email}
                onChange={onChangeEmail}
                onKeyPress={(e) =>
                  pressEnterKey({ event: e, process: onClickSignUp })
                }
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Flex w={'100vw'} align={'center'} justify={'center'}>
            <ModalButton
              text={'仮登録メールを送信する'}
              onClick={onClickSignUp}
            />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
