import { Box, Flex, Table, Tag, Tbody, Td, Th, Thead, Tooltip, Tr } from '@chakra-ui/react';
import { FC, memo } from 'react';

type Props = {
  incomeExpenses: IncomeExpense[];
};

type IncomeExpense = {
  id: number;
  date: string;
  categoryName: string;
  memo: string;
  amount: number;
};

export const IncomeExpenseTable: FC<Props> = memo((props) => {
  const { incomeExpenses } = props;

  return (
    <Box h={'40vh'} w={{ base: '100%', md: '80%' }} overflowY={'scroll'}>
      <Table
        backgroundColor={'white'}
        borderRadius={'lg'}
        position={'relative'}
      >
        <Thead>
          <Tr position={'sticky'} top={0} zIndex={1}>
            <Th
              width={{ base: '10%', md: '20%' }}
              backgroundColor={'white'}
              borderRightWidth={'1px'}
            >
              日付
            </Th>
            <Th
              width={{ base: '50%', md: '40%' }}
              backgroundColor={'white'}
              borderRightWidth={'1px'}
            >
              用途
            </Th>
            <Th width={'40%'} backgroundColor={'white'}>
              金額（円）
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {incomeExpenses.map(({ id, date, categoryName, memo, amount }) => (
            <Tr key={id}>
              <Td borderRightWidth={'1px'}>{convertDate(date)}</Td>
              <Td borderRightWidth={'1px'}>
                <Flex align={'center'} justify={'space-between'}>
                  {categoryName}
                  {memo !== '' && (
                    <Tooltip hasArrow bg={'gray'} label={memo}>
                      <Tag
                        colorScheme={'orange'}
                        display={{ base: 'none', md: 'block' }}
                      >
                        メモ
                      </Tag>
                    </Tooltip>
                  )}
                </Flex>
              </Td>
              <Td>{convertAmount(amount)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
});

// ex) 2000-12-01 => 12/1
const convertDate = (date: string) => {
  return `${Number(date.substring(5, 7))}/${Number(date.substring(8, 10))}`;
};

// ex) 1000000 => 1,000,000
const convertAmount = (amount: number) => {
  return amount.toLocaleString();
};
