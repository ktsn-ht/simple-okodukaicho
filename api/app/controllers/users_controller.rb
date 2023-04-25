class UsersController < ApplicationController
  skip_before_action :verify_jwt, only: [:create]

  def create
    # 仮のユーザーID・パスワードを発行
    tmp_user_id = "user#{Time.zone.now.strftime('%N')}"
    tmp_password = SecureRandom.alphanumeric(10)

    @user = User.create!(user_id: tmp_user_id, email: params[:email], password: tmp_password)

    # 仮登録完了メールを送信
    UserMailer.with(user: @user, password: tmp_password).sign_up_email.deliver_later

    render json: { message: 'sign up scceeded' }, status: :ok
  rescue ActiveRecord::RecordInvalid
    render json: { message: 'email invalid' }, status: :bad_request
  end

  def update
    # 現パスワードで認証失敗した場合はエラー
    raise StandardError unless @user&.authenticate(params[:password])

    # ユーザーID・パスワード・仮登録フラグの更新
    @user.update!(params)

    render json: update_ok_response, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: update_ng_response(e), status: :bad_request
  rescue StandardError
    render json: { message: 'password wrong' }, status: :unauthorized
  end

  private

  def update_ok_response
    {
      message: 'registration scceeded',
      user_id: @user.user_id,
      email: @user.email,
      temporary: @user.temporary_flg
    }
  end

  def update_ng_response(error)
    {
      message: 'invalid parameters',
      param: error.record.errors.first.attribute.to_s,
      type: error.record.errors.first.type.to_s
    }
  end
end
