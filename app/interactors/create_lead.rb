class CreateLead
  include Interactor

  def call
    lead = Lead.find_by_email(context.lead[:email])
    if lead
         lead.update(context.lead)
         context.lead = lead
    else
       lead = Lead.create(context.lead)
       if lead.persisted?
         context.lead = lead
       else
         context.fail!(error: lead&.errors&.full_messages)
      end
    end
  end


end
