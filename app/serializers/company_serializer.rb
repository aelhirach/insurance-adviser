class CompanySerializer < ActiveModel::Serializer
  type :company
  attributes :company_id, :available,  :cover_premiums
  belongs_to :lead
  def company_id
    object.id
  end
  cache key: 'quote', expires_in: 3.hours
end
