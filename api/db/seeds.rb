# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

user = User.create(user_id: 'user', password: 'p@ssword', email: 'test@example.com', temporary_flg: false)

Category.initial_create(user)

date = Time.zone.today
beginning_of_month = date.beginning_of_month

IncomeExpense.create(
  amount: 200000, date: beginning_of_month + 23.days, user:, category: Category.find_by(name: '給与')
)
10.times do |i|
  IncomeExpense.create(amount: 100, date:, memo: "test#{i}", user:, category: Category.find_by(name: '食費'))
end
