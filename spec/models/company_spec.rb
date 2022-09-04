require 'rails_helper'

RSpec.describe Company, type: :model do

  before(:all) do
    @company = create(:company)
  end

  it "is valid with valid attributes" do
   expect(@company).to be_valid
  end

  it "is not valid without a annual_revenue" do
    company2 = build(:company, annual_revenue: nil)
    expect(company2).to_not be_valid
  end

  it "is not valid without a enterprise_number" do
    company2 = build(:company, enterprise_number: nil)
    expect(company2).to_not be_valid
  end

  it "is not valid without a legal_name" do
    company2 = build(:company, legal_name: nil)
    expect(company2).to_not be_valid
  end

  it "is not valid without a natural_person" do
    company2 = build(:company, natural_person: nil)
    expect(company2).to_not be_valid
    # should validate_inclusion_of(subject.natural_person).in_array([true, false])
    # expect(company2).to_not validate_inclusion_of(:natural_person).in_array([true, false]) 
  end
  it "is not valid without a nacebel_codes" do
    company2 = build(:company, nacebel_codes: nil)
    expect(company2).to_not be_valid
  end


end
