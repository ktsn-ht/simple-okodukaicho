import { Box, Button, FormControl, FormLabel, Input, Stack, Switch } from '@chakra-ui/react';
import { ChangeEvent, FC, memo, useState } from 'react';

export const SignUp: FC = memo(() => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const onChangeShowPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setShowPassword(e.target.checked);
  const onChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.target.value);
  const onChangeShowNewPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setShowNewPassword(e.target.checked);

  const onClickRegistAccount = () => {};

  return (
    <Box
      display="flex"
      h={'100vh'}
      justifyContent={'center'}
      padding={{ base: 3, md: 5 }}
    >
      <Stack w={'60vw'} spacing={8}>
        <FormControl>
          <FormLabel fontWeight={'bold'}>ユーザーID</FormLabel>
          <Input bg={'white'} value={userId} onChange={onChangeUserId} />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={'bold'}>現在のパスワード</FormLabel>
          <Input
            bg={'white'}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={onChangePassword}
          />
          <Switch size={'sm'} pt={'4'} onChange={onChangeShowPassword}>
            現在のパスワードを表示する
          </Switch>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={'bold'}>変更後のパスワード</FormLabel>
          <Input
            bg={'white'}
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={onChangeNewPassword}
          />
          <Switch size={'sm'} pt={'4'} onChange={onChangeShowNewPassword}>
            変更後のパスワードを表示する
          </Switch>
        </FormControl>
        <Box display="flex" justifyContent={'center'}>
          <Button
            color={'white'}
            bg={'cyan.600'}
            fontSize={'sm'}
            _hover={{ bg: 'cyan.500' }}
            onClick={onClickRegistAccount}
          >
            新しいユーザーID・パスワードを登録する
          </Button>
        </Box>
      </Stack>
    </Box>
  );
});
