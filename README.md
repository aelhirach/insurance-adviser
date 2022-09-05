# ![Insurance Adviser](https://lh4.googleusercontent.com/-e7ASqd31bjU/AAAAAAAAAAI/AAAAAAAAAAA/GeVGekwYpDQ/s88-p-k-no-ns-nd/photo.jpg)

# Live Demo
A live demo is running with Heroku  at: http://insurance-adviser.herokuapp.com/

# Requirements

This application requires:

- Ruby v3.1.2
- Rails v6.1.6.1
- Node v16.13.x
- Yarn v1.22.x Package Manager
- PostgreSQL Database

Learn more about [Rails](http://railsapps.github.io/installing-rails.html).



# Getting started
For this project, I implemented only test for models : 


To get the Rails server running locally:

- Clone this repo
- `bundle install` to install GEM req'd dependencies
- `yarn install` to install javascript dependencies
- `rake db:create` to create the database
- `rake db:migrate` to make all database migrations
- `rails s` to start the local server

- Viste the Home page
```
http://localhost:3000
```

# Code Overview

## Dependencies

Production
- [active_model_serializers](https://github.com/rails-api/active_model_serializers) -  JSON rendering gem used for making reusable templates for JSON output.
- [faker](https://github.com/faker-ruby/faker) - This gem used to generate fake data.
- [interactor-rails](https://github.com/collectiveidea/interactor-rails) - An interactor is a simple, single-purpose object, used to encapsulate your application's business logic.

Development & Test
- [rspec-rails](https://github.com/rspec/rspec-rails) brings the RSpec testing framework to Ruby on Rails as a drop-in alternative to its default testing framework, Minitest.
- [dotenv-rails](https://github.com/bkeepers/dotenv) - Shim to load environment variables from .env into ENV in development.
- [factory_bot_rails](https://github.com/thoughtbot/factory_bot_rails) - This gem help in generating data for Test, is a fixtures replacement with a straightforward definition syntax.
- [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers) - shoulda Matchers provides RSpec one-liners to test common Rails functionality that, if written by hand, would be much longer, more complex, and error-prone.


## Important Folders

- `app/models` - Contains the database models for the application where we can define methods, validations, queries, and relations to other models.
- `app/views` - Contains the entry point (HomePage Template) which refers to the javascript folder with a pack_tag. It contains also the template of the mailers.
- `app/interactors` - Contains the application's business logic. Each interactor represents one thing that application does.
- `app/serializers` - Contains templates for generating the JSON output for the API
- `app/controllers` - Contains the controllers where requests are routed to their actions, where we find and manipulate our models and return JSON response.
- `config` - Contains configuration files for our Rails application and for our database, along with an `initializers` folder for scripts that get run on boot.
- `db` - Contains the migrations needed to create our database schema.

## Helpers

- [`app/models/concerns/array_validator.rb`](https://github.com/aelhirach/insurance-adviser/blob/master/app/models/concerns/array_validator.rb) - ArrayValidator : Validate an array data type in Ruby on Rails using a custom validator - PostGresQL allows arrays as a DB type.


## Configuration
### MailTrap
MailTrap is a SMTP server designed to run in your dev/test environment, that is designed to catch any email you or your application is sending, and display it in a web interface instead of sending to real world.

Here is how your SMTP server configuration to start sending email with Mailtrap.
- [`app/config/environments/development.rb`](https://github.com/aelhirach/insurance-adviser/blob/master/app/config/environments/development.rb#L41)
- [`app/config/environments/production.rb`](https://github.com/aelhirach/insurance-adviser/blob/master/app/config/environments/development.rb#L65)

#### MailTrap Environment Variables
To get the mailing running locally, create an .env file the following variables (go to SMTP credentials at Mailtrap interface, then just copy and paste them). Here is the env example file location [`app/.env.example`](https://github.com/aelhirach/insurance-adviser/blob/master/.env.example)
```shell
MAIL_TRAP_HOST=
MAIL_TRAP_USERNAME=
MAIL_TRAP_PASSWORD=
MAIL_TRAP_ADDRESS=
```

### camelCase Payloads

- [`config/initializers/active_model_serializer.rb`](https://github.com/aelhirach/insurance-adviser/blob/master/config/initializers/active_model_serializer.rb) - Active Model Serializer configuration for [camelCase](https://github.com/rails-api/active_model_serializers/blob/a032201a91cbca407211bca0392ba881eef1f7ba/docs/general/key_transforms.md) output
- [`app/controllers/application_controller.rb#underscore_params!`](https://github.com/aelhirach/insurance-adviser/blob/master/app/controllers/application_controller.rb#L27) - Convert camelCase params into snake_case params

### Skip verify_authenticity_token

By default Ruby on Rails will throw an exception when a request doesn't contain a valid CSRF token. For the sake of simplicity (In reality we must use a session or JWT Token) we can tell Rails to skip this verification [app/controllers/application_controller.rb](https://github.com/aelhirach/insurance-adviser/blob/master/app/controllers/application_controller.rb#L2).


# Testing

## Important Folders
- [factories](https://github.com/aelhirach/insurance-adviser/tree/master/spec/factories).
- [interactors specs](https://github.com/aelhirach/insurance-adviser/tree/master/spec/interactors).
- [models specs](https://github.com/aelhirach/insurance-adviser/tree/master/spec/models).

## Configuration
- [`app/controllers/application_controller.rb#underscore_params!`](https://github.com/aelhirach/insurance-adviser/blob/master/spec/support/factory_bot.rb) - Factory_bot support folder. 
- [`spec/rails_helper#require 'support/factory_bot'`](https://github.com/aelhirach/insurance-adviser/blob/master/spec/rails_helper.rb#L27) Include factory_bot synthax in specs. 
- [`spec/rails_helper#Shoulda::Matchers.configure`](https://github.com/aelhirach/insurance-adviser/blob/master/spec/rails_helper.rb#L67) Configure shoulda-matchers gem to be used in sepcs.  
### Running specs

```sh
# Default: Run all spec files (i.e., those matching spec/**/*_spec.rb)
$ bundle exec rspec

# Run all spec files in a single directory (recursively)
$ bundle exec rspec spec/models

# Run a single spec file
$ bundle exec rspec spec/models/company.rb

# Run a single example from a spec file (by line number)
$ bundle exec rspec spec/models/company.rb:8

# See all options for running specs
$ bundle exec rspec --help
```
