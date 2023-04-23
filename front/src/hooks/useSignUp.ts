import { postUsers } from '../api/requests/users';
import { useMessage } from './useMessage';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/userState';

type Props = {
  email: string;
  onClose: () => void;
};

export const useSignUp = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const setUserInfo = useSetRecoilState(userState);

  const signUp = (props: Props) => {
    const { email, onClose } = props;

    if (email === '') {
      showMessage({
        title: 'メールアドレスは必ず入力してください',
        status: 'error',
      });
      return;
    }

    postUsers({ email: email })
      .then(() => {
        setUserInfo({ loggedIn: false, userId: '', email: email });
        showMessage({ title: '仮登録メールを送信しました', status: 'info' });
        onClose();
        navigate('/');
      })
      .catch(() => {
        showMessage({
          title: '入力されたメールアドレスは登録済みです',
          status: 'error',
        });
      });
  };

  return { signUp };
};
