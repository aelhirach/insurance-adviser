class RequestQuote
  include Interactor::Organizer

  organize CreateLead, CreateCompany, CreateQuote
end
