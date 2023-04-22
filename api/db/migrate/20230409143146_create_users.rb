class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :user_id, null: false, default: '', comment: 'ユーザーID'
      t.string :password_digest, null: false, default: '', comment: 'パスワード'

      t.timestamps
    end

    add_index :users, :user_id, unique: true

    change_column_comment :users, :id, from: nil, to: 'ID'
    change_column_comment :users, :created_at, from: nil, to: '作成日時'
    change_column_comment :users, :updated_at, from: nil, to: '更新日時'
  end
end
