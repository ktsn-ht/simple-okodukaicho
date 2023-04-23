class UsersController < ApplicationController
  skip_before_action :verify_jwt, only: [:create]

  def create
    @user = User.new(email: params[:email])

    # 一時的なユーザーID・パスワードを発行してDBに保存
    @user.set_temporary_user_id
    @password = @user.set_temporary_password
    @user.save!

    # 仮登録完了メールを送信
    UserMailer.with(user: @user, password: @password).sign_up_email.deliver_later

    render json: { message: 'sign up scceeded' }, status: :ok
  rescue ActiveRecord::RecordInvalid
    render json: { message: 'email invalid' }, status: :bad_request
  end
end
