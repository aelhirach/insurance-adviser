FactoryBot.define do
  factory :company, class: Company do
    annual_revenue { Faker::Number.number(digits: 5).ceil(-4)}
    enterprise_number { Faker::Number.unique.leading_zero_number(digits: 10) }
    legal_name { Faker::Company.unique.name }
    natural_person { Faker::Boolean.boolean }
    nacebel_codes { Array.new(5){Faker::Number.number(digits: 5)}}
    association :lead


    trait :with_invalid_enterprise_number_format do
      enterprise_number { "NOT-DIGITS" }
    end

    trait :enterprise_number_does_not_start_with_0 do
      enterprise_number {  Faker::Number.number(digits: 10) }
    end

    trait :with_invalid_nacebel_codes_format do
      nacebel_codes {  55252 }
    end

    trait :with_invalid_nacebel_codes_content do
      nacebel_codes {  ["string", "54220", "72250", "55525", "44455"] }
    end

    trait :with_invalid_nacebel_codes_digits_size do
      nacebel_codes {  ["585", "54220", "72250", "55525", "44455"] }
    end
  end
end
