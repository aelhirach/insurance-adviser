class CreateCompany
  include Interactor

  def call

     company = Company.find_by_enterprise_number(context.company[:enterprise_number])
     if company
          company.update(context.company)
          context.company = company

     else
        company =  Company.create(context.company.merge(lead_id: context.lead.id))
        if company.persisted?
          context.company = company
        else
          context.fail!(error: company&.errors&.full_messages)
       end

     end


  end

end
