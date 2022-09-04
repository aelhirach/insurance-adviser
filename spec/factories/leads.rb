FactoryBot.define do
  factory :lead do
    email { Faker::Internet.unique.email }
    phone_number { Faker::PhoneNumber.unique.phone_number }
    address { Faker::Address.unique.full_address }
    first_name { Faker::Name.unique.first_name }
    last_name { Faker::Name.unique.last_name }
  end
end
