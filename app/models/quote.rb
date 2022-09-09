class Quote < ApplicationRecord
  enum deductible_formula: [:small,:medium, :large], _prefix: true, _default: :medium
  enum coverage_ceiling_formula: [:small,:large],  _prefix: true, _default: :small
  

  belongs_to :company

  def deductible
    case Quote.deductible_formulas[self[:deductible_formula]]
      when Quote.deductible_formulas[:small]
            return 10000
      when Quote.deductible_formulas[:medium]
            return 5000
      when Quote.deductible_formulas[:large]
          return 0
    end
  end

  def coverage_ceiling
    case Quote.coverage_ceiling_formulas[self[:coverage_ceiling_formula]]
      when Quote.coverage_ceiling_formulas[:small]
            return 300000
      when Quote.coverage_ceiling_formulas[:large]
          return 800000
    end
  end

end
