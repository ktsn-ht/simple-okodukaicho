class User < ApplicationRecord
  before_validation { self.email = email.downcase }

  validates :user_id, presence: true, length: { maximum: 16 }, uniqueness: true,
                      format: { with: /\A[a-z0-9]+\z/ }
  validates :email, presence: true, length: { maximum: 256 }, uniqueness: true,
                    format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }
  validates :password, presence: true, length: { minimum: 8 }

  has_secure_password

  def set_temporary_user_id
    self.user_id = email.gsub(/[^a-z0-9]/, '')[..15]
  end

  def set_temporary_password
    tmp_password = SecureRandom.alphanumeric(10)
    self.password = tmp_password

    tmp_password
  end
end
