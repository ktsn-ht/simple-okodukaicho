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

  def update
    @user = User.find(params[:id])

    # 現パスワードで認証失敗した場合はエラー
    raise StandardError unless @user&.authenticate(params[:password])

    # ユーザーID・パスワード・仮登録フラグの更新
    @user.update!(params)

    render json: { message: 'registration scceeded' }, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: update_ng_response(e), status: :bad_request
  rescue StandardError
    render json: { message: 'password wrong' }, status: :unauthorized
  end

  private

  def update_ng_response(error)
    {
      message: 'invalid parameters',
      param: error.record.errors.first.attribute.to_s,
      type: error.record.errors.first.type.to_s
    }
  end
end
