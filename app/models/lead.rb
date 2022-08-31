class Lead < ApplicationRecord
  validates_presence_of :email, :phone_number, :address, :first_name, :last_name
  validates_uniqueness_of :email
  validates_length_of :first_name, :last_name, maximum: 100
  validates_format_of :email, with: URI::MailTo::EMAIL_REGEXP
  has_many :companies
  has_many :quotes, through: :companies

end
