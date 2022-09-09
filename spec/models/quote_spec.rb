require 'rails_helper'
RSpec.describe Quote, type: :model do
  # can use let to force the method’s invocation before each example.

  describe 'Associations' do
    # use the Rspec implicit subject to test associations with shoulda-matchers
    it { should belong_to(:company) }
  end


  describe 'Validations' do
    # use the Rspec implicit subject to test ActiveRecord validations with shoulda-matchers
    it { should define_enum_for(:deductible_formula).with_values([:small,:medium, :large]).with_prefix }
    it { should define_enum_for(:coverage_ceiling_formula).with_values([:small, :large]).with_prefix }

  end

  describe 'Instance methods' do
    let(:quote){ FactoryBot.create(:quote) }
    context '#deductible' do
    it 'should return 10000 when deductible_fromat is small' do
        quote.deductible_formula = :small
        expect(quote.deductible).to eq(10000)
    end

    it 'should return 5000 when deductible_fromat is small' do
        quote.deductible_formula = :medium
        expect(quote.deductible).to eq(5000)
    end
    it 'should return 0 when deductible_fromat is small' do
        quote.deductible_formula = :large
        expect(quote.deductible).to eq(0)
    end

    end
    context '#coverage_ceiling' do

    it 'should return 300000 when coverage_ceiling_formula is small' do
        quote.coverage_ceiling_formula = :small
        expect(quote.coverage_ceiling).to eq(300000)
    end

    it 'should return 800000 when coverage_ceiling_formula is large' do
        quote.coverage_ceiling_formula = :large
        expect(quote.coverage_ceiling).to eq(800000)
    end

    end
  end

end
