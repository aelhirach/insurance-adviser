FactoryBot.define do
  factory :quote do
    deductible_formula { [:small, :medium, :large].sample }
    coverage_ceiling_formula { [:small, :large].sample }
    cover_premiums { {afterDelivery: Faker::Number.between(from: 20.00, to: 100.00).round(2),
                   publicLiability: Faker::Number.between(from: 100.00, to: 200.00).round(2),
                   professionalIndemnity: Faker::Number.between(from: 100.00, to: 300.00).round(2),
                   entrustedObjects: Faker::Number.between(from: 10.00, to: 50.00).round(2),
                   legalExpenses: Faker::Number.between(from: 20.00, to: 200.00).round(2) }}
    association :company
  end
end
