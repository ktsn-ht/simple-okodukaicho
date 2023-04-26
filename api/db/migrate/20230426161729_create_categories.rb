class CreateCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :categories, comment: '収支カテゴリー' do |t|
      t.string :name, null: false, default: '', limit: 16, comment: '収支カテゴリー名'
      t.boolean :income_flg, null: false, default: true, comment: '収支フラグ'
      t.references :user, index: true, foreign_key: true, comment: 'ユーザーID'

      t.timestamps
    end

    change_column_comment :categories, :id, from: nil, to: 'ID'
    change_column_comment :categories, :created_at, from: nil, to: '作成日時'
    change_column_comment :categories, :updated_at, from: nil, to: '更新日時'
  end
end
