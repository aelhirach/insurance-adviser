class Company < ApplicationRecord
  include ActiveModel::Validations

  validates :natural_person, inclusion: { in: [ true, false ] }
  validates :nacebel_codes, array: { length: { maximum: 5 } }
  validates_presence_of :annual_revenue, :nacebel_codes, :enterprise_number, :legal_name
  validates_uniqueness_of :enterprise_number
  validates :enterprise_number, length: {is: 10}
  validate :enterprise_number_starts_with_zero


  belongs_to :lead
  has_one :quote, dependent: :destroy



  def enterprise_number_starts_with_zero
    unless enterprise_number&.downcase&.start_with?('0')
      errors.add(:enterprise_number, " must start with '0'")
    end
  end

end
