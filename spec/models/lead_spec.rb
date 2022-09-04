require 'rails_helper'
RSpec.describe Lead, type: :model do
  before(:all) do
    @lead = create(:lead)
  end

  it "is valid with valid attributes" do
   expect(@lead).to be_valid
  end

  it "has a unique email" do
    lead2 = build(:lead, email: @lead.email)
    expect(lead2).to_not be_valid
  end

  it "is not valid without a first_name" do
    lead2 = build(:lead, first_name: nil)
    expect(lead2).to_not be_valid
  end

  it "is not valid without a last_name" do
    lead2 = build(:lead, last_name: nil)
    expect(lead2).to_not be_valid
  end

  it "is not valid without a email" do
    lead2 = build(:lead, email: nil)
    expect(lead2).to_not be_valid
  end

  it "is not valid without a address" do
    lead2 = build(:lead, address: nil)
    expect(lead2).to_not be_valid
  end

  it "is not valid without a phone_number" do
    lead2 = build(:lead, phone_number: nil)
    expect(lead2).to_not be_valid
  end

end
