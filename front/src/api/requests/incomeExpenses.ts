import { client } from './common/client';
import { getIncomeExpensesParams } from '../params/incomeExpensesParams';

export const getIncomeExpenses = (params: getIncomeExpensesParams) => {
  return client.get('/income-expenses', params);
};
