class AddRecommendedIndexes < ActiveRecord::Migration[5.2]
  disable_ddl_transaction!

  def change
    add_index :accounts, :domain, algorithm: :concurrently
    add_index :accounts, :silenced_at, algorithm: :concurrently
    add_index :statuses, :updated_at, algorithm: :concurrently
    add_index :statuses, :deleted_at, algorithm: :concurrently
  end
end
