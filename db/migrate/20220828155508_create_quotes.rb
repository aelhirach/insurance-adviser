class CreateQuotes < ActiveRecord::Migration[6.1]
  def change
    create_table :quotes , force: :cascade do |t|
      t.integer :deductible_formula, default: 1
      t.integer :coverage_ceiling_formula, default: 0
      t.jsonb :cover_premiums, null: false, default: {:afterDelivery=> 0.00, :publicLiability=> 0.0, :professionalIndemnity=> 0.0, :entrustedObjects=> 0.0, :legalExpenses=> 20.87 }
      t.references :company, null: false, foreign_key: true
      t.timestamps
    end
  end
end
