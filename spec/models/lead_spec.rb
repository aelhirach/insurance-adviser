require 'rails_helper'
RSpec.describe Lead, type: :model do


  describe 'Associations' do
    # use the Rspec implicit subject to test associations with shoulda-matchers
    it { should have_many(:companies).dependent(:delete_all) }
    it { should have_many(:quotes).through(:companies) }
  end


  describe 'Validations' do
    # use the Rspec implicit subject to test ActiveRecord validations with shoulda-matchers
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:address) }
    it { should validate_presence_of(:phone_number) }
    it { should allow_value('user@example.com').for(:email)}

    context 'email uniqueness' do
      # we have to build a valid object before using a validate_uniqueness_of matcher
      subject {  FactoryBot.build(:lead) } # We use FactoryBot to build instances of our models
      it { should validate_uniqueness_of(:email).ignoring_case_sensitivity }
    end
  end



end
