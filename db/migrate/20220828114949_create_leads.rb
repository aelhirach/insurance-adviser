class CreateLeads < ActiveRecord::Migration[6.1]
  def change
    create_table :leads , force: :cascade do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :address, null: false
      t.string :phone_number, null: false
      t.string :email, null: false, uniqueness: true
      t.timestamps
    end
  end
end
