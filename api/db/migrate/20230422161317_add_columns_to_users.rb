class AddColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :email, :string, null: false, default: '', comment: 'メールアドレス'
    add_column :users, :tempolary_flg, :boolean, null: false, default: true, comment: '仮登録フラグ'
  end
end
