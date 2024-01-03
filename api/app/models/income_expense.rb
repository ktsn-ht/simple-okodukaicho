class IncomeExpense < ApplicationRecord
  belongs_to :user
  belongs_to :category

  class << self
    # userの収支一覧を取得
    def search(user, date)
      # userが利用している収支カテゴリーを取得
      income_expense_categories = Category.where(user:)
      income_categories = income_expense_categories.where(income_flg: true)
      expense_categories = income_expense_categories.where(income_flg: false)

      # 当月の範囲を指定
      date = date.to_date
      date_range = date.beginning_of_month..date.end_of_month

      # レスポンスに含める情報をフィルタリング
      income_expenses = filter_income_expenses(user, date_range, income_expense_categories)
      incomes = filter_income_expenses(user, date_range, income_categories)
      expenses = filter_income_expenses(user, date_range, expense_categories)

      [income_expenses, incomes, expenses]
    end

    private

    # 必要な情報をフィルタリング
    def filter_income_expenses(user, date_range, category)
      filtered_income_expenses = preload(:category).where(user:, date: date_range, category:).order(date: :desc)

      filtered_income_expenses.map do |income_expense|
        {
          id: income_expense.id,
          date: income_expense.date,
          category_name: income_expense.category.name,
          memo: income_expense.memo,
          amount: income_expense.amount
        }
      end
    end
  end
end
