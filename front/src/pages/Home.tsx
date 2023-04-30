import {
    Box,
    Button,
    Flex,
    Heading,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from '@chakra-ui/react';
import { FC, memo, useCallback, useEffect, useState } from 'react';

import { IncomeExpenseTable } from '../components/table/IncomeExpenseTable';
import { getIncomeExpenses } from '../api/requests/incomeExpenses';

export const Home: FC = memo(() => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const [incomeExpenses, setIncomeExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const setTableData = useCallback(() => {
    getIncomeExpenses({
      params: {
        date: `${year}-${month}-1`,
      },
    })
      .then((res) => {
        setIncomeExpenses(res.data.incomeExpenses);
        setIncomes(res.data.incomes);
        setExpenses(res.data.expenses);
      })
      .catch();
  }, [year, month]);

  useEffect(() => {
    setTableData();
  }, [setTableData]);

  return (
    <Box
      display="flex"
      h={'100vh'}
      justifyContent={'center'}
      padding={{ base: 3, md: 5 }}
    >
      <Stack spacing={8}>
        <Heading textAlign={'center'}>{`${year}年${month}月`}</Heading>
        <Flex w={'100vw'} align={'center'} justify={'center'}>
          <Button
            color={'white'}
            bg={'cyan.600'}
            fontSize={'sm'}
            _hover={{ bg: 'cyan.500' }}
          >
            収支を入力する
          </Button>
        </Flex>
        <Tabs align={'center'} isFitted={true}>
          <TabList>
            <Tab>一覧</Tab>
            <Tab>収入</Tab>
            <Tab>支出</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <IncomeExpenseTable incomeExpenses={incomeExpenses} />
            </TabPanel>
            <TabPanel>
              <IncomeExpenseTable incomeExpenses={incomes} />
            </TabPanel>
            <TabPanel>
              <IncomeExpenseTable incomeExpenses={expenses} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Box>
  );
});
