class LeadSerializer < ActiveModel::Serializer
  type :lead
  attributes :email, :phone_number, :address, :first_name, :last_name
  cache key: 'lead', expires_in: 3.hours

end
