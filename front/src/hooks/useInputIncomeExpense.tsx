import { useSetRecoilState } from 'recoil';

import { postIncomeExpensesParams } from '../api/params/incomeExpensesParams';
import { postIncomeExpenses } from '../api/requests/incomeExpenses';
import { incomeExpenseState } from '../store/incomeExpenseState';
import { useMessage } from './useMessage';

type Props = {
  params: postIncomeExpensesParams;
  onClose: () => void;
};

export const useInputIncomeExpense = () => {
  const { showMessage } = useMessage();

  const setIncomeExpenses = useSetRecoilState(incomeExpenseState);

  const inputIncomeExpense = async (props: Props) => {
    try {
      const { params, onClose } = props;

      const response = await postIncomeExpenses(params);
      setIncomeExpenses({
        incomeExpenses: response.data.incomeExpenses,
        incomes: response.data.incomes,
        expenses: response.data.expenses,
      });

      showMessage({ title: '収支の入力が完了しました', status: 'success' });
      onClose();
    } catch (error) {
      showMessage({ title: '収支の入力に失敗しました', status: 'error' });
    }
  };

  return { inputIncomeExpense };
};
