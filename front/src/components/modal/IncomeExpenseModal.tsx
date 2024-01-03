import React, { FC, memo, useState } from 'react';

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
  Stack,
  Text,
} from '@chakra-ui/react';

import { useEnterKey } from '../../hooks/useEnterKey';
import { useInputIncomeExpense } from '../../hooks/useInputIncomeExpense';
import { DateSelect } from '../select/DateSelect';

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
                <DateSelect
                  defaultValue={date.getFullYear()}
                  width={'40%'}
                  onChange={inputYear}
                  choices={yearChoices(date.getFullYear())}
                />
                <Text mt={'1%'} mr={'5%'} ml={'2%'}>
                  年
                </Text>
                <DateSelect
                  defaultValue={date.getMonth() + 1}
                  width={'20%'}
                  onChange={inputMonth}
                  choices={monthChoices}
                />
                <Text mt={'1%'} mr={'5%'} ml={'2%'}>
                  月
                </Text>
                <DateSelect
                  defaultValue={date.getDate()}
                  width={'20%'}
                  onChange={inputDay}
                  choices={dayChoices}
                />
                <Text mt={'1%'} ml={'2%'}>
                  日
                </Text>
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

const yearChoices = (year: number) => {
  return [year - 1, year, year + 1];
};
const monthChoices = Array.from({ length: 12 }, (_, index) => index + 1);
const dayChoices = Array.from({ length: 31 }, (_, index) => index + 1);
