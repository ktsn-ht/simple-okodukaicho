# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_22_161317) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "users", id: { comment: "ID" }, force: :cascade do |t|
    t.string "user_id", default: "", null: false, comment: "ユーザーID"
    t.string "password_digest", default: "", null: false, comment: "パスワード"
    t.datetime "created_at", null: false, comment: "作成日時"
    t.datetime "updated_at", null: false, comment: "更新日時"
    t.string "email", default: "", null: false, comment: "メールアドレス"
    t.boolean "tempolary_flg", default: true, null: false, comment: "仮登録フラグ"
  end

end
