class CompanySerializer < ActiveModel::Serializer
  type :company
  attributes :annual_revenue, :natural_person, :nacebel_codes, :enterprise_number, :legal_name
  belongs_to :lead
  def company_id
    object.id
  end
  cache key: 'quote', expires_in: 3.hours
end
