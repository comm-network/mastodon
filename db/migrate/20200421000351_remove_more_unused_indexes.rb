class RemoveMoreUnusedIndexes < ActiveRecord::Migration[5.2]
  def change
    remove_index :media_attachments, name: "index_media_attachments_on_scheduled_status_id" if index_name_exists?(:media_attachments, "index_media_attachments_on_scheduled_status_id")
    remove_index :account_conversations, name: "index_account_conversations_on_conversation_id" if index_name_exists?(:account_conversations, "index_account_conversations_on_conversation_id")
    remove_index :account_pins, name: "index_account_pins_on_account_id" if index_name_exists?(:account_pins, "index_account_pins_on_account_id")
    remove_index :account_pins, name: "index_account_pins_on_target_account_id" if index_name_exists?(:account_pins, "index_account_pins_on_target_account_id")
    remove_index :bookmarks, name: "index_bookmarks_on_account_id" if index_name_exists?(:bookmarks, "index_bookmarks_on_account_id")
    remove_index :invites, name: "index_invites_on_user_id" if index_name_exists?(:invites, "index_invites_on_user_id")
    remove_index :markers, name: "index_markers_on_user_id" if index_name_exists?(:markers, "index_markers_on_user_id")
    remove_index :mutes, name: "index_mutes_on_target_account_id" if index_name_exists?(:mutes, "index_mutes_on_target_account_id")
    remove_index :oauth_access_grants, name: "index_oauth_access_grants_on_resource_owner_id" if index_name_exists?(:oauth_access_grants, "index_oauth_access_grants_on_resource_owner_id")
    remove_index :oauth_applications, name: "index_oauth_applications_on_owner_id_and_owner_type" if index_name_exists?(:oauth_applications, "index_oauth_applications_on_owner_id_and_owner_type")
    remove_index :reports, name: "index_reports_on_account_id" if index_name_exists?(:reports, "index_reports_on_account_id")
    remove_index :reports, name: "index_reports_on_target_account_id" if index_name_exists?(:reports, "index_reports_on_target_account_id")
    remove_index :session_activations, name: "index_session_activations_on_access_token_id" if index_name_exists?(:session_activations, "index_session_activations_on_access_token_id")
    remove_index :users, name: "index_users_on_created_by_application_id" if index_name_exists?(:users, "index_users_on_created_by_application_id")
    remove_index :web_push_subscriptions, name: "index_web_push_subscriptions_on_access_token_id" if index_name_exists?(:web_push_subscriptions, "index_web_push_subscriptions_on_access_token_id")
    remove_index :web_push_subscriptions, name: "index_web_push_subscriptions_on_user_id" if index_name_exists?(:web_push_subscriptions, "index_web_push_subscriptions_on_user_id")
    remove_index :announcement_mutes, name: "index_announcement_mutes_on_account_id" if index_name_exists?(:announcement_mutes, "index_announcement_mutes_on_account_id")
    remove_index :announcement_mutes, name: "index_announcement_mutes_on_announcement_id" if index_name_exists?(:announcement_mutes, "index_announcement_mutes_on_announcement_id")
    remove_index :announcement_reactions, name: "index_announcement_reactions_on_account_id" if index_name_exists?(:announcement_reactions, "index_announcement_reactions_on_account_id")
    remove_index :announcement_reactions, name: "index_announcement_reactions_on_announcement_id" if index_name_exists?(:announcement_reactions, "index_announcement_reactions_on_announcement_id")
    remove_index :announcement_reactions, name: "index_announcement_reactions_on_custom_emoji_id" if index_name_exists?(:announcement_reactions, "index_announcement_reactions_on_custom_emoji_id")
  end
end
