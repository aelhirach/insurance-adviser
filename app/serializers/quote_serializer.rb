class QuoteSerializer < ActiveModel::Serializer
  type :quote
  attributes :coverage_ceiling, :deductible, :quote_id, :cover_premiums

  def quote_id
    object.id
  end

  attribute :coverage_ceiling do
    object.coverage_ceiling
  end

  attribute :deductible do
    object.deductible
  end
  cache key: 'quote', expires_in: 3.hours

end
