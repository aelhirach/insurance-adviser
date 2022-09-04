require 'rails_helper'
RSpec.describe Quote, type: :model do
  before(:all) do
    @quote = create(:quote)
  end

  it "is valid with valid attributes" do
   expect(@quote).to be_valid
  end

  
end
