class IncomeExpensesController < ApplicationController
  def index
    # userの当月の収支一覧・収入・支出を検索
    income_expenses, incomes, expenses = IncomeExpense.search(@user, params[:date])

    render json: { income_expenses:, incomes:, expenses: }
  end

  def create
    category = Category.find_by(user: @user, name: params[:category])
    raise StandardError if category.nil?

    IncomeExpense.create!(amount: params[:amount], date: params[:date], memo: params[:memo], user: @user, category:)
    income_expenses, incomes, expenses = IncomeExpense.search(@user, params[:date])

    render json: { income_expenses:, incomes:, expenses: }
  rescue ActiveRecord::RecordInvalid
    render json: { message: 'income_expense params invalid' }, status: :bad_request
  rescue StandardError
    render json: { message: 'category params invalid' }, status: :bad_request
  end
end
