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

    postLogin({ userId: userId, password: password })
      .then(() => {
        setUserInfo({ loggedIn: true, userId: userId });
        showMessage({ title: 'ログインに成功しました', status: 'success' });
        onClose();
        navigate('/home');
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          showMessage({
            title: 'ユーザー名またはパスワードが間違っています',
            status: 'error',
          });
        } else {
          showMessage({
            title: '内部エラーが発生しました',
            status: 'error',
          });
        }
      });
  };

  return { login };
};
