class CreateCompanies < ActiveRecord::Migration[6.1]
  def change
    create_table :companies , force: :cascade do |t|
      t.integer :annual_revenue, null: false
      t.string :enterprise_number, null: false, limit: 10, uniqueness: true
      t.string :legal_name, null: false
      t.boolean :natural_person, null: false
      t.string :nacebel_codes, null: false, array: true, default: []
      t.references :lead, null: false, foreign_key: true
      t.timestamps
    end
  end
end
