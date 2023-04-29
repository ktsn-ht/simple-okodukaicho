class Category < ApplicationRecord
  belongs_to :user
  has_many :income_expenses, dependent: :destroy

  # 初期収支カテゴリーの作成
  def self.initial_create(user)
    initial_expense_category_names = %w[住居費 水道光熱費 食費 日用品費 娯楽費 通信費 その他]
    initial_income_category_names = %w[給与 賞与 その他]

    initial_expense_category_names.each do |name|
      create!(name:, income_flg: false, user:)
    end

    initial_income_category_names.each do |name|
      create!(name:, income_flg: true, user:)
    end
  end
end
