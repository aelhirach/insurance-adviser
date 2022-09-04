require 'rails_helper'

RSpec.describe Company, type: :model do
  subject { described_class.new({annual_revenue: Faker::Number.number(digits: 5).ceil(-4),
                         enterprise_number: Faker::Number.unique.leading_zero_number(digits: 10),
                         legal_name: Faker::Company.unique.name,
                         natural_person: false,
                         nacebel_codes: ['86210' , '86220', '86230' , '86901', '86902' , '86903']}) }

  # it "is valid with valid attributes" do
  #     expect(subject).to be_valid
  # end
  it "is not valid without a annual_revenue" do
    subject.annual_revenue = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a enterprise_number" do
    subject.enterprise_number = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a legal_name" do
    subject.legal_name = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a natural_person" do
    subject.natural_person = nil
    # should validate_inclusion_of(subject.natural_person).in_array([true, false])
    expect(subject).to_not be_valid
  end
  it "is not valid without a nacebel_codes" do
    subject.nacebel_codes = nil
    expect(subject).to_not be_valid
  end


end
