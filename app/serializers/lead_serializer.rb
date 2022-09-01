class LeadSerializer < ActiveModel::Serializer
  type :lead
  attributes :lead_id, :email, :phone_number, :address, :first_name, :last_name
  cache key: 'lead', expires_in: 3.hours

  def lead_id
    object.id
  end
end
