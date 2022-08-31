require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module InsuranceAdviser
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1
    config.generators do |g|
        g.test_framework :rspec,
          fixtures: true, #specifies to generate a fixture for each model (using a Factory Girl factor instead of an actual fixture)
          view_specs: false, #says to skip generating view specs. I won't cover them in this book; instea we'll use feature specs to test interface elements.
          helper_specs: false, #skips generating specs for the helper files Rails generates with eac controller. As your comfort level with RSpec improves, consider changing this option to tru and testing these files.
          routing_specs: false, #omits a spec file for your config/routes. rb file. If your application is simple, as the one in this book will be, you're probably safe skipping these specs. As you application grows, however, and takes on more complex routing, it's a good idea to incorporate
          controller_specs: false,
          request_specs: false #skips RSpec's defaults for adding integration-level specs in spec/requests. We'll cover this in chapter 8, at which time we'll just create our own files.
        #g.fixture_replacement :factory_hot, dir:"spec/factories" #tells Rails to generate factories instead of fixtures, and to save them in the spec/factories directory. Don't forget, just because RSpec won't be generating some files for you doesn't mean you can't add sine Tot crample if vou need to add a helper
    end
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Don't generate system test files.
    config.generators.system_tests = nil
  end
end
