class SendQuoteEmail
  include Interactor

  def call
    SendQuoteMailer.notify_quote_simulation(context.quote, context.lead , context.company).deliver_later
    rescue Net::SMTPFatalError, Net::SMTPAuthenticationError => e
      context.fail!(error: "Error occured. #{e.to_s}")
  end
end
