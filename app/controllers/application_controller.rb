class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  # Convert lowerCamelCase params to snake_case automatically
  before_action :underscore_params!



  def render_success_response(data: nil, more_data: nil, message: nil, serializer_options: {})
      resp_data = { success: true }
      resp_data[:message] = message if message
      # Serialize the resource
      resp_data[:data] = ActiveModelSerializers::SerializableResource.new(data, serializer_options) if data

      render json: resp_data, status: 200
  end

  def render_error_response(message: nil)
      resp_data = { success: false , message: "quote not computed"}

      # Serialize the resource
      resp_data[:data] = {available: false, message: message}
      render json: resp_data, status: :unprocessable_entity
  end


  private
  def underscore_params!
    params.deep_transform_keys!(&:underscore)
  end

end
