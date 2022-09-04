require 'faker'
FactoryBot.define do
  factory :doctor_company, class: Company do
      annual_revenue { 80000 }
      enterprise_number  {'0649885171'}
      legal_name  {"Doctor Morgane"}
      natural_person  {true}
      nacebel_codes {['86210' , '86220', '86230' , '86901', '86902' , '86903']}

  end

  factory :random_company, class: Company do
    annual_revenue { Faker::Number.number(digits: 5).ceil(-4)}
    enterprise_number { Faker::Number.unique.leading_zero_number(digits: 10) }
    legal_name { Faker::Company.unique.name }
    natural_person { Faker::Boolean.boolean }
    nacebel_codes { Array.new(5){Faker::Number.number(digits: 5)}}
  end
end
