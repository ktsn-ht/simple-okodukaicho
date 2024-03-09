import { atom } from 'recoil';

export const incomeExpenseState = atom({
  key: 'incomeExpenseState',
  default: { incomeExpenses: [], incomes: [], expenses: [] },
});
