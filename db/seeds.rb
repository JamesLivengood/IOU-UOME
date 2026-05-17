# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

exit if User.count > 0

20.times do
  name = Faker::GameOfThrones.character
  email = name.downcase.split(' ').join('_')
  User.create(email: "#{email}@gmail.com", password: 'swagger', name: name)
end

User.create(email: "jamie_lannister@gmail.com", password: 'swagger', name: 'Jamie')

50.times do
  Bill.create(total_bill_amount: rand(100..500), amount_originally_owed: rand(10..99), owing_at_creation_user_id: rand(1..10), owed_to_at_creation_user_id: rand(11..20), description: Faker::GameOfThrones.dragon)
end


Bill.all.each do |bill|
  Friendship.create(user1_id: bill.owed_to_at_creation_user_id, user2_id: bill.owing_at_creation_user_id) unless Friendship.where(user1_id: bill.owed_to_at_creation_user_id, user2_id: bill.owing_at_creation_user_id).length > 0
end

Bill.all.each do |bill|
  Payment.create(bill_id: bill.id, paying_user_id: bill.owing_at_creation_user_id, submitting_user_id: bill.owing_at_creation_user_id, payment_amount: rand(1...bill.amount_originally_owed))
end

# Bill.all.each do |bill|
#   BillJoin.create(user_id: rand(1..20), bill_id: bill.id, owing: false)
#   BillJoin.create(user_id: bill.owing_at_creation_user_id, bill_id: bill.id, owing: true)
# end
