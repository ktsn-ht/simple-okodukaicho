import { FC, memo } from 'react';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

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
    <TableContainer display={'flex'} justifyContent={'center'}>
      <Table
        width={{ base: '90%', md: '80%' }}
        backgroundColor={'white'}
        borderRadius={'lg'}
      >
        <Thead>
          <Tr>
            <Th width={'20%'} borderRightWidth={'1px'}>
              日付
            </Th>
            <Th width={'40%'} borderRightWidth={'1px'}>
              用途
            </Th>
            <Th width={'40%'}>金額（円）</Th>
          </Tr>
        </Thead>
        <Tbody>
          {incomeExpenses.map(({ id, date, categoryName, memo, amount }) => (
            <Tr key={id}>
              <Td borderRightWidth={'1px'}>{date}</Td>
              <Td borderRightWidth={'1px'}>{categoryName}</Td>
              <Td>{amount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
});
