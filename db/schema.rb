# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_08_28_155508) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "companies", force: :cascade do |t|
    t.integer "annual_revenue", null: false
    t.string "enterprise_number", limit: 10, null: false
    t.string "legal_name", null: false
    t.boolean "natural_person", null: false
    t.string "nacebel_codes", default: [], null: false, array: true
    t.bigint "lead_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["lead_id"], name: "index_companies_on_lead_id"
  end

  create_table "leads", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "address", null: false
    t.string "phone_number", null: false
    t.string "email", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "quotes", force: :cascade do |t|
    t.integer "deductible_formula", default: 1
    t.integer "coverage_ceiling_formula", default: 0
    t.jsonb "cover_premiums", default: {"afterDelivery"=>0.0, "legalExpenses"=>20.87, "publicLiability"=>0.0, "entrustedObjects"=>0.0, "professionalIndemnity"=>0.0}, null: false
    t.bigint "company_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_quotes_on_company_id"
  end

  add_foreign_key "companies", "leads"
  add_foreign_key "quotes", "companies"
end
