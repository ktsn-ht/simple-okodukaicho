class IncomeExpensesController < ApplicationController
  def index
    # userの当月の収支一覧・収入・支出を検索
    income_expenses, incomes, expenses = IncomeExpense.search(@user, params[:date])

    render json: { income_expenses:, incomes:, expenses: }
  end
end
