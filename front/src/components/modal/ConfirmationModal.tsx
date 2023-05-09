import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { FC, memo } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  confirm: () => void;
};

export const ConfirmationModal: FC<Props> = memo((props) => {
  const { isOpen, onClose, confirm } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={'lg'}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'}>登録の確認</ModalHeader>
        <ModalBody mx={4}>
          入力した内容で本登録をおこないます。よろしいですか？
        </ModalBody>
        <ModalFooter>
          <Box
            display="flex"
            w={'100%'}
            justifyContent={'center'}
            padding={{ base: 3, md: 5 }}
          >
            <Button
              w={'40%'}
              color={'white'}
              bg={'cyan.600'}
              mr={'2%'}
              fontSize={'sm'}
              _hover={{ bg: 'cyan.500' }}
              onClick={confirm}
            >
              確認
            </Button>
            <Button
              w={'40%'}
              color={'white'}
              bg={'red.600'}
              ml={'2%'}
              fontSize={'sm'}
              _hover={{ bg: 'red.500' }}
              onClick={onClose}
            >
              キャンセル
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
