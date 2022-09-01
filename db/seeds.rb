# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'



10.times do |i|

     lead = Lead.create({first_name: Faker::Name.unique.first_name,
                         last_name: Faker::Name.unique.last_name,
                         address: Faker::Address.unique.full_address,
                         phone_number: Faker::PhoneNumber.unique.phone_number,
                         email: Faker::Internet.unique.email})


      company = Company.create({annual_revenue: Faker::Number.number(digits: 5).ceil(-4),
                             enterprise_number: Faker::Number.unique.leading_zero_number(digits: 10),
                             legal_name: Faker::Company.unique.name,
                             natural_person: false,
                             nacebel_codes: ['86210' , '86220', '86230' , '86901', '86902' , '86903'],
                            lead: lead})

     3.times do |j|
          Quote.create({deductible_formula: [:small, :medium, :large].sample,
                        coverage_ceiling_formula: [:small, :large].sample,
                        cover_premiums: {afterDelivery: Faker::Number.between(from: 20.00, to: 100.00).round(2),
                                       publicLiability: Faker::Number.between(from: 100.00, to: 200.00).round(2),
                                       professionalIndemnity: Faker::Number.between(from: 100.00, to: 300.00).round(2),
                                       entrustedObjects: Faker::Number.between(from: 10.00, to: 50.00).round(2),
                                       legalExpenses: Faker::Number.between(from: 20.00, to: 200.00).round(2) },
                      company: company
                      })
     end


end
