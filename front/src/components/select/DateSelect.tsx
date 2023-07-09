import { FC, memo } from 'react';

import { Select } from '@chakra-ui/react';

type Props = {
  defaultValue: number;
  width: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  choices: number[];
};

export const DateSelect: FC<Props> = memo((props) => {
  const { defaultValue, width, onChange, choices } = props;

  return (
    <Select
      defaultValue={defaultValue}
      size={'sm'}
      w={width}
      onChange={onChange}
    >
      {choices.map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </Select>
  );
});
