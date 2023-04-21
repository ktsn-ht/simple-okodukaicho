type Props = {
  event: React.KeyboardEvent<HTMLInputElement>;
  process: () => void;
};

export const useEnterKey = () => {
  const pressEnterKey = (props: Props) => {
    const { event, process } = props;
    if (event.key === 'Enter') {
      process();
    }
  };

  return { pressEnterKey };
};
