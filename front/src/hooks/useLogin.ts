import { postLogin } from '../api/requests/login';
import { useMessage } from './useMessage';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/userState';

type Props = {
  userId: string;
  password: string;
  onClose: () => void;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const setUserInfo = useSetRecoilState(userState);

  const login = (props: Props) => {
    const { userId, password, onClose } = props;

    if (userId === '' || password === '') {
      showMessage({
        title: 'ユーザー名・パスワードは必ず入力してください',
        status: 'error',
      });
      return;
    }

    postLogin({ userId: userId, password: password })
      .then((res) => {
        setUserInfo({ loggedIn: true, userId: userId, email: res.data.email });
        showMessage({ title: 'ログインに成功しました', status: 'success' });
        onClose();
        res.data.temporary ? navigate('/sign-up') : navigate('/home');
      })
      .catch(() => {
        showMessage({
          title: 'ユーザー名またはパスワードが間違っています',
          status: 'error',
        });
      });
  };

  return { login };
};
