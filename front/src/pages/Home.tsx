import { FC, memo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import {
    Box, Button, Flex, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure
} from '@chakra-ui/react';

import { IncomeExpenseModal } from '../components/modal/IncomeExpenseModal';
import { IncomeExpenseTable } from '../components/table/IncomeExpenseTable';
import { incomeExpenseState } from '../store/incomeExpenseState';

export const Home: FC = memo(() => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const incomeExpenseInfo = useRecoilValue(incomeExpenseState);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        display="flex"
        justifyContent={'center'}
        padding={{ base: 3, md: 5 }}
      >
        <Stack spacing={8}>
          <Heading textAlign={'center'}>{`${year}年${month}月`}</Heading>
          <Flex w={'100%'} align={'center'} justify={'center'}>
            <Button
              color={'white'}
              bg={'cyan.600'}
              fontSize={'sm'}
              _hover={{ bg: 'cyan.500' }}
              onClick={onOpen}
            >
              収支を入力する
            </Button>
          </Flex>
          <Tabs w={'100vw'} align={'center'} isFitted={true}>
            <TabList>
              <Tab>一覧</Tab>
              <Tab>収入</Tab>
              <Tab>支出</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <IncomeExpenseTable
                  incomeExpenses={incomeExpenseInfo.incomeExpenses}
                />
              </TabPanel>
              <TabPanel>
                <IncomeExpenseTable
                  incomeExpenses={incomeExpenseInfo.incomes}
                />
              </TabPanel>
              <TabPanel>
                <IncomeExpenseTable
                  incomeExpenses={incomeExpenseInfo.expenses}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Box>
      <IncomeExpenseModal isOpen={isOpen} onClose={onClose} />
    </>
  );
});
