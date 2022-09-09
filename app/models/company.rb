class Company < ApplicationRecord
  validates :natural_person, inclusion: { in: [ true, false ] }
  validates_presence_of :annual_revenue, :nacebel_codes, :enterprise_number, :legal_name
  validates_uniqueness_of :enterprise_number
  validates :enterprise_number, length: {is: 10}
  validate :validate_enterprise_number_format
  validate :validate_nacebel_codes_format

  belongs_to :lead
  has_one :quote, dependent: :destroy


  def validate_nacebel_codes_format
    if !nacebel_codes&.is_a?(Array)
      errors.add(:nacebel_codes,  "must be an array")
    elsif !nacebel_codes&.all?{ |e| e =~ /^\d+$/ }
        errors.add(:nacebel_codes,  "must contain only digits")
    elsif nacebel_codes&.one?{|d| d.length != 5}
        errors.add(:nacebel_codes,  "codes must be 5 digits")
    end
  end

  def validate_enterprise_number_format
    if !enterprise_number&.scan(/\D/)&.empty?
      errors.add(:enterprise_number, "must contain only digits")
    elsif !enterprise_number&.downcase&.start_with?('0')
      errors.add(:enterprise_number, "must start with '0'")
    end
  end


end
