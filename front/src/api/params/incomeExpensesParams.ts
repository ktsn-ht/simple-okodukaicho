export type getIncomeExpensesParams = {
  params: {
    date: string;
  };
};

export type postIncomeExpensesParams = {
  category: string;
  amount: number;
  date: string;
  memo: string;
};
