require 'rails_helper'

RSpec.describe Company, type: :model do
  describe 'Associations' do
    # use the Rspec implicit subject to test associations with shoulda-matchers
    it { should belong_to(:lead) }
    it { should have_one(:quote).dependent(:destroy) }
  end

  describe 'Validations' do
    # use the Rspec implicit subject to test ActiveRecord validations with shoulda-matchers
    it { should validate_presence_of(:annual_revenue) }
    it { should validate_presence_of(:enterprise_number) }
    it { should validate_presence_of(:legal_name) }

    context 'validates enterprise_number' do
      it { should validate_length_of(:enterprise_number).is_equal_to(10) }
      context 'enterprise_number uniqueness' do
        # we have to build a valid object before using a validate_uniqueness_of matcher
        subject { FactoryBot.build(:company) } # We use FactoryBot to build instances of our models
        it { should validate_uniqueness_of(:enterprise_number).ignoring_case_sensitivity }
      end
      context 'should start with 0' do
        let(:company_with_enterprise_number_does_not_start_with_0) { FactoryBot.build(:company, :enterprise_number_does_not_start_with_0) }
        it 'doest have errors related to enterprise_number string with 0' do
          company_with_enterprise_number_does_not_start_with_0.validate
          expect(company_with_enterprise_number_does_not_start_with_0.errors[:enterprise_number]).to include("must start with '0'")
        end
      end
      context 'should contain only digits' do
        let(:company_with_invalid_enterprise_number_format) { FactoryBot.build(:company, :with_invalid_enterprise_number_format) }
        it 'doest have errors related to enterprise_number with only digits' do
          company_with_invalid_enterprise_number_format.validate
          expect(company_with_invalid_enterprise_number_format.errors[:enterprise_number]).to include("must contain only digits")
        end
      end
    end

    context 'validates nacebel_codes' do
      it { should validate_presence_of(:nacebel_codes) }
      context 'should be an array' do
        let(:company_with_invalid_nacebel_codes_format) { FactoryBot.build(:company, :with_invalid_nacebel_codes_format) }
        it 'doest have errors related to nacebel_codes array format' do
          company_with_invalid_nacebel_codes_format.validate
          expect(company_with_invalid_nacebel_codes_format.errors[:nacebel_codes]).to include("must be an array")
        end
      end
      context 'should contain only digits' do
        let(:company_with_invalid_nacebel_codes_content) { FactoryBot.build(:company, :with_invalid_nacebel_codes_content) }
        it 'doest have errors related to nacebel_codes content digits' do
          company_with_invalid_nacebel_codes_content.validate
          expect(company_with_invalid_nacebel_codes_content.errors[:nacebel_codes]).to include("must contain only digits")
        end
      end
      context 'should contain codes of 5 digits' do
        let(:company_with_invalid_nacebel_codes_digts_size) { FactoryBot.build(:company, :with_invalid_nacebel_codes_digits_size) }
        it 'doest have errors related to nacebel_codes digits size' do
          company_with_invalid_nacebel_codes_digts_size.validate
          expect(company_with_invalid_nacebel_codes_digts_size.errors[:nacebel_codes]).to include("codes must be 5 digits")
        end
      end
    end
  end

end
