import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack
} from '@chakra-ui/react';
import React, { FC, memo, useState } from 'react';

import { useEnterKey } from '../../hooks/useEnterKey';
import { useInputIncomeExpense } from '../../hooks/useInputIncomeExpense';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const IncomeExpenseModal: FC<Props> = memo((props) => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [day, setDay] = useState(date.getDate());
  const [category, setCategory] = useState('食費');
  const [memo, setMemo] = useState('');
  const [amount, setAmount] = useState(0);

  const inputYear = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setYear(Number(e.target.value));
  const inputMonth = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setMonth(Number(e.target.value));
  const inputDay = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setDay(Number(e.target.value));
  const inputCategory = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);
  const inputMemo = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMemo(e.target.value);
  const inputAmount = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(Number(e.target.value));

  const { isOpen, onClose } = props;

  const { pressEnterKey } = useEnterKey();

  const [incomeFlg, setIncomeFlg] = useState(true);

  const { inputIncomeExpense } = useInputIncomeExpense();

  const onClickInput = () =>
    inputIncomeExpense({
      params: {
        category: category,
        amount: amount,
        date: `${year}-${month}-${day}`,
        memo: memo,
      },
      onClose: onClose,
    });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={'lg'}
      autoFocus={false}
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pt={2} pb={2}>
        <ModalCloseButton />
        <ModalHeader textAlign={'center'}>収支の入力</ModalHeader>
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl mb={'5%'}>
              <Flex>
                <Select
                  defaultValue={year}
                  size={'xs'}
                  w={'40%'}
                  mr={'2%'}
                  onChange={inputYear}
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </Select>
                年
                <Select
                  defaultValue={month}
                  size={'xs'}
                  w={'20%'}
                  mr={'2%'}
                  ml={'5%'}
                  onChange={inputMonth}
                >
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                </Select>
                月
                <Select
                  defaultValue={day}
                  size={'xs'}
                  w={'20%'}
                  mr={'2%'}
                  ml={'5%'}
                  onChange={inputDay}
                >
                  <option value="11">11</option>
                  <option value="10">10</option>
                  <option value="9">9</option>
                </Select>
                日
              </Flex>
            </FormControl>
            <FormControl>
              <Flex alignItems={'center'} justifyContent="center" mb={'5%'}>
                <Button
                  isActive={incomeFlg}
                  w={'50%'}
                  color={'white'}
                  bg={'gray.300'}
                  size={'sm'}
                  _hover={{ bg: 'cyan.600' }}
                  _active={{ bg: 'cyan.600' }}
                  onClick={() => {
                    setIncomeFlg(true);
                  }}
                >
                  収入
                </Button>
                <Button
                  isActive={!incomeFlg}
                  w={'50%'}
                  color={'white'}
                  bg={'gray.300'}
                  size={'sm'}
                  _hover={{ bg: 'cyan.600' }}
                  _active={{ bg: 'cyan.600' }}
                  onClick={() => {
                    setIncomeFlg(false);
                  }}
                >
                  支出
                </Button>
              </Flex>
            </FormControl>
            <FormControl>
              <Flex align={'center'} mb={'3%'}>
                <FormLabel w={'10%'}>用途</FormLabel>
                <Select defaultValue={category} onChange={inputCategory}>
                  <option>食費</option>
                  <option>給与</option>
                </Select>
              </Flex>
            </FormControl>
            <FormControl>
              <Flex align={'center'} mb={'3%'}>
                <FormLabel w={'10%'}>メモ</FormLabel>
                <Input onChange={inputMemo} />
              </Flex>
            </FormControl>
            <FormControl>
              <Flex align={'center'} mb={'3%'}>
                <FormLabel w={'10%'}>金額</FormLabel>
                <Input mr={'2%'} onChange={inputAmount} />円
              </Flex>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Flex w={'100vw'} align={'center'} justify={'center'}>
            <Button
              w={'40%'}
              color={'white'}
              bg={'cyan.600'}
              mr={'2%'}
              fontSize={'sm'}
              _hover={{ bg: 'cyan.500' }}
              onClick={onClickInput}
            >
              入力
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
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
