class CreateQuote
  include Interactor

  def call
    #####
    # According to company data and the lead profession create an insurance quote
    # The logique here is simple : A lead is a doctor if one of his nacebel_codes is in the following codes :
    # 86210 Activités des médecins généralistes
    # 86220 Activités des médecins spécialistes
    # 86230 Pratique dentaire
    # 86901 Activités des laboratoires médicaux
    # 86902 Activités des centres de collecte de sang, des banques de sang et d'organes
    #####

    doctor_nacebel_codes = ['86210' , '86220', '86230' , '86901', '86902']

    is_doctor = context.company[:nacebel_codes].kind_of?(Array) && doctor_nacebel_codes.intersection(context.company[:nacebel_codes]).length > 0


    quote = Quote.new({cover_premiums: {afterDelivery: Faker::Number.between(from: 20.00, to: 100.00).round(2),
                                                    publicLiability: Faker::Number.between(from: 100.00, to: 200.00).round(2),
                                                    professionalIndemnity: Faker::Number.between(from: 100.00, to: 300.00).round(2),
                                                    entrustedObjects: Faker::Number.between(from: 10.00, to: 50.00).round(2),
                                                    legalExpenses: Faker::Number.between(from: 20.00, to: 200.00).round(2) },
                                  company: context.company
                  })

    # advice a doctor when values are not forced
    quote.deductible_formula = context[:deductible_formula].present? ? context[:deductible_formula] : :small if is_doctor
    quote.coverage_ceiling_formula =  context[:coverage_ceiling_formula].present? ? context[:coverage_ceiling_formula] : :large if is_doctor

    if quote.save
       context.quote = quote
    else
      context.fail!(error: quote&.errors&.full_messages)
    end
  end




end
