class User < ApplicationRecord
  has_many :income_expenses, dependent: :destroy
  has_many :categories, dependent: :destroy

  before_validation { self.email = email.downcase }

  validates :user_id, presence: true, length: { maximum: 16 }, uniqueness: true,
                      format: { with: /\A[a-z0-9]+\z/ }
  validates :email, presence: true, length: { maximum: 256 }, uniqueness: true,
                    format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }
  validates :password, presence: true, length: { minimum: 8 }

  has_secure_password

  # ユーザーID・パスワード・仮登録フラグの更新
  def update!(params)
    # 仮登録から本登録である場合、初期の収支カテゴリーを作成
    Category.initial_create(self) if temporary_flg

    self.user_id = params[:user_id]
    self.password = params[:new_password]
    self.temporary_flg = false
    save!
  end
end
