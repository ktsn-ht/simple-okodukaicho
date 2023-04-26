class CreateIncomeExpenses < ActiveRecord::Migration[7.0]
  def change
    create_table :income_expenses, comment: '収支' do |t|
      t.integer :amount, null: false, default: 0, comment: '金額'
      t.date :date, null: false, comment: '日付'
      t.string :memo, default: '', comment: 'メモ'
      t.references :user, index: true, foreign_key: true, comment: 'ユーザーID'

      t.timestamps
    end

    change_column_comment :income_expenses, :id, from: nil, to: 'ID'
    change_column_comment :income_expenses, :created_at, from: nil, to: '作成日時'
    change_column_comment :income_expenses, :updated_at, from: nil, to: '更新日時'
  end
end
