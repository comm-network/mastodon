# frozen_string_literal: true

# == Schema Information
#
# Table name: user_invite_requests
#
#  id         :bigint(8)        not null, primary key
#  user_id    :bigint(8)
#  text       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserInviteRequest < ApplicationRecord
  belongs_to :user, inverse_of: :invite_request

  def self.determine_min_length
    Setting.require_join_reason && Setting.registrations_mode == 'approved' ? 10 : 0
  end

  validates :text, presence: true, length: { in: determine_min_length..500 }, allow_blank: Setting.require_join_reason == false
end
