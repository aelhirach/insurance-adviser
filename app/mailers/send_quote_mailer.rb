class SendQuoteMailer < ApplicationMailer
      default from: "test@insurance-adviser.com"
      def notify_quote_simulation(quote,lead,company)
          @quote = quote
          @lead = lead
          @company = company
          @url = "#{root_url}quote-simulation/#{@quote.id}"
          mail(to: @lead.email, subject: "Quote for: #{company[:legal_name]}.")
      end
end
