FactoryBot.define do
  factory :company, class: Company do
    annual_revenue { Faker::Number.number(digits: 5).ceil(-4)}
    enterprise_number { Faker::Number.unique.leading_zero_number(digits: 10) }
    legal_name { Faker::Company.unique.name }
    natural_person { Faker::Boolean.boolean }
    nacebel_codes { Array.new(5){Faker::Number.number(digits: 5)}}
    association :lead
  end
end
