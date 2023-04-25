import { putUsers } from '../api/requests/users';
import { useMessage } from './useMessage';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/userState';

type Props = {
  userId: string;
  password: string;
  newPassword: string;
  onClose: () => void;
};

export const useRegistAccount = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const setUserInfo = useSetRecoilState(userState);

  const registAccount = (props: Props) => {
    const { userId, password, newPassword, onClose } = props;

    if (userId === '' || password === '' || newPassword === '') {
      showMessage({
        title:
          'ユーザーID・現在のパスワード・新しいパスワードは必ず入力してください',
        status: 'error',
      });
      return;
    }

    putUsers({ userId: userId, password: password, newPassword: newPassword })
      .then((res) => {
        setUserInfo({
          loggedIn: true,
          userId: res.data.userId,
          email: res.data.email,
        });
        showMessage({ title: '本登録が完了しました', status: 'info' });
        onClose();
        navigate('/home');
      })
      .catch((error) => {
        let title = '';
        if (error?.response?.status === 401) {
          title = '現在のパスワードが間違っています';
        } else if (
          error?.response?.data?.param === 'user_id' &&
          error?.response?.data?.type === 'taken'
        ) {
          title = '入力されたユーザーIDは既に使用されています';
        } else {
          title = '入力されたユーザーID・パスワードが不正です';
        }
        showMessage({ title: title, status: 'error' });
        onClose();
      });
  };

  return { registAccount };
};
