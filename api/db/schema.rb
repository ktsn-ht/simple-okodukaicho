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

ActiveRecord::Schema[7.0].define(version: 2023_04_29_012139) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", id: { comment: "ID" }, comment: "収支カテゴリー", force: :cascade do |t|
    t.string "name", limit: 16, default: "", null: false, comment: "収支カテゴリー名"
    t.boolean "income_flg", default: true, null: false, comment: "収支フラグ"
    t.bigint "user_id", comment: "ユーザーID"
    t.datetime "created_at", null: false, comment: "作成日時"
    t.datetime "updated_at", null: false, comment: "更新日時"
    t.index ["name", "income_flg", "user_id"], name: "index_categories_on_name_and_income_flg_and_user_id", unique: true
    t.index ["user_id"], name: "index_categories_on_user_id"
  end

  create_table "income_expenses", id: { comment: "ID" }, comment: "収支", force: :cascade do |t|
    t.integer "amount", default: 0, null: false, comment: "金額"
    t.date "date", null: false, comment: "日付"
    t.string "memo", default: "", comment: "メモ"
    t.bigint "user_id", comment: "ユーザーID"
    t.datetime "created_at", null: false, comment: "作成日時"
    t.datetime "updated_at", null: false, comment: "更新日時"
    t.bigint "category_id", comment: "収支カテゴリーID"
    t.index ["category_id"], name: "index_income_expenses_on_category_id"
    t.index ["user_id"], name: "index_income_expenses_on_user_id"
  end

  create_table "users", id: { comment: "ID" }, comment: "ユーザー", force: :cascade do |t|
    t.string "user_id", limit: 16, default: "", null: false, comment: "ユーザーID"
    t.string "password_digest", default: "", null: false, comment: "パスワード"
    t.datetime "created_at", null: false, comment: "作成日時"
    t.datetime "updated_at", null: false, comment: "更新日時"
    t.string "email", limit: 256, default: "", null: false, comment: "メールアドレス"
    t.boolean "temporary_flg", default: true, null: false, comment: "仮登録フラグ"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["user_id"], name: "index_users_on_user_id", unique: true
  end

  add_foreign_key "categories", "users"
  add_foreign_key "income_expenses", "categories"
  add_foreign_key "income_expenses", "users"
end
