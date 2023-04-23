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
  onClick: () => void;
};

export const ConfirmationModal: FC<Props> = memo((props) => {
  const { isOpen, onClose, onClick } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={'md'}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>登録の確認</ModalHeader>
        <ModalBody mx={4}>
          入力された内容で登録します。よろしいですか？
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
              onClick={onClick}
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
