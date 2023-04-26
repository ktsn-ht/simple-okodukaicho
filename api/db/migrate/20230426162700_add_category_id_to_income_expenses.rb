class AddCategoryIdToIncomeExpenses < ActiveRecord::Migration[7.0]
  def change
    add_reference :income_expenses, :category, index: true, foreign_key: true, comment: '収支カテゴリーID'
  end
end
