import { postIncomeExpenses } from '../api/requests/incomeExpenses';
import { postIncomeExpensesParams } from '../api/params/incomeExpensesParams';
import { useMessage } from './useMessage';

type Props = {
  params: postIncomeExpensesParams;
  onClose: () => void;
};

export const useInputIncomeExpense = () => {
  const { showMessage } = useMessage();

  const inputIncomeExpense = (props: Props) => {
    const { params, onClose } = props;
    postIncomeExpenses(params)
      .then(() => {
        showMessage({ title: '収支の入力が完了しました', status: 'success' });
        onClose();
      })
      .catch(() => {
        showMessage({ title: '収支の入力に失敗しました', status: 'error' });
      });
  };

  return { inputIncomeExpense };
};
