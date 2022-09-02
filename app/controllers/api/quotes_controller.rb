class Api::QuotesController < ApplicationController
    before_action :set_quote, only: %i[show]


    # GET /quotes/[:id]
    def show
      if @quote
        render_success_response(data: @quote, serializer_options: {:include_company => true})
      else
        render_error_response(message: @quote&.errors&.full_messages)
      end
    end

    # POST /quotes
    def create
        result = RequestQuote.call(request_params)
        if result.success?
            render_success_response(data: result.quote , serializer_options: {:include_company => true})
        else
            render_error_response(message: result.error)
        end
    end

    # private functions
    private
    def request_params
        params.permit({:lead => [:first_name, :last_name, :address, :email, :phone_number]},
                      {:company => [:annual_revenue, :natural_person, :enterprise_number, :legal_name,:nacebel_codes => []]},
                       :deductible_formula,
                       :coverage_ceiling_formula,
                       :quote
                     )
    end

    def set_quote
      @quote = Quote.find(params[:id])
    end


end
