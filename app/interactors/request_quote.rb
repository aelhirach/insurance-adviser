class RequestQuote
  include Interactor::Organizer

  organize CreateLead, CreateCompany, CreateQuote, SendQuoteEmail
end
