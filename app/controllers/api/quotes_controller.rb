class Api::QuotesController < ApplicationController
    skip_before_action :verify_authenticity_token

    before_action :set_quote, only: %i[show]

    # GET /quotes/[:id]
    def show
      if @quote
        render json: { success: true, message: "success", data: QuoteSerializer.new(@quote)}, status: :ok
      else
        render json: { errors: @quote&.errors&.full_messages }, status: :unprocessable_entity
      end
    end

    # POST /quotes
    def create
        result = RequestQuote.call(request_params)
        if result.success?
            render json: { success: true, message: "success", data: {available: true}.merge(QuoteSerializer.new(result.quote))}, status: :ok
        else
            render json: { success: false, message: "quote not computed", data: {available: false, message: result.error} }, status:  :unprocessable_entity
        end
    end

    # private functions
    private
    def request_params
        params.permit({:lead => [:first_name, :last_name, :address, :email, :phone_number]},
                      {:company => [:annual_revenue, :natural_person, :enterprise_number, :legal_name,:nacebel_codes => []]},
                       :deductible_formula,
                       :coverage_ceiling_formula
                     )
    end

    def set_quote
      @quote = Quote.find(params[:id])
    end
end
