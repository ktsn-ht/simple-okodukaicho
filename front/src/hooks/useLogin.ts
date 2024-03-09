import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { getIncomeExpenses } from '../api/requests/incomeExpenses';
import { postLogin } from '../api/requests/login';
import { incomeExpenseState } from '../store/incomeExpenseState';
import { userState } from '../store/userState';
import { useMessage } from './useMessage';

type Props = {
  userId: string;
  password: string;
  onClose: () => void;
};

export const useLogin = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const setUserInfo = useSetRecoilState(userState);
  const setIncomeExpenses = useSetRecoilState(incomeExpenseState);

  const login = async (props: Props) => {
    try {
      const { userId, password, onClose } = props;

      if (userId === '' || password === '') {
        showMessage({
          title: 'ユーザー名・パスワードは必ず入力してください',
          status: 'error',
        });
        return;
      }

      const loginInfo = await postLogin({ userId: userId, password: password });
      setUserInfo({
        loggedIn: true,
        userId: userId,
        email: loginInfo.data.email,
      });
      onClose();

      if (loginInfo.data.temporary) {
        showMessage({
          title: 'ユーザーID・パスワードを更新してください',
          status: 'success',
        });
        navigate('/sign-up');
      } else {
        const response = await getIncomeExpenses({
          params: {
            date: `${year}-${month}-1`,
          },
        });
        setIncomeExpenses({
          incomeExpenses: response.data.incomeExpenses,
          incomes: response.data.incomes,
          expenses: response.data.expenses,
        });

        showMessage({ title: 'ログインに成功しました', status: 'success' });
        navigate('/home');
      }
    } catch (error) {
      showMessage({
        title: 'ユーザー名またはパスワードが間違っています',
        status: 'error',
      });
    }
  };

  return { login };
};
