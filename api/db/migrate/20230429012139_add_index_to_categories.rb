class AddIndexToCategories < ActiveRecord::Migration[7.0]
  def change
    add_index :categories, %i[name income_flg user_id], unique: true
  end
end
