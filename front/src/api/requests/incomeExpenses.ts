import { getIncomeExpensesParams, postIncomeExpensesParams } from '../params/incomeExpensesParams';

import { client } from './common/client';

export const getIncomeExpenses = (params: getIncomeExpensesParams) => {
  return client.get('/income-expenses', params);
};

export const postIncomeExpenses = (params: postIncomeExpensesParams) => {
  return client.post('/income-expenses', params);
};
