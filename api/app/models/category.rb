class Category < ApplicationRecord
  belongs_to :user
  has_many :income_expenses, dependent: :destroy
end
