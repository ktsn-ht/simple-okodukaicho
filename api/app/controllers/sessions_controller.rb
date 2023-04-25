class SessionsController < ApplicationController
  skip_before_action :verify_jwt, only: [:create]

  def new
    render json: { message: 'login authenticated', user_id: @user.user_id }, status: :ok
  end

  def create
    @user = User.find_by(user_id: params[:user_id]) || User.find_by(email: params[:user_id])
    if @user&.authenticate(params[:password])
      update_jwt(@user.id)
      render json: create_ok_response, status: :ok
    else
      render json: { message: 'user not found' }, status: :unauthorized
    end
  end

  def destroy; end

  private

  def create_ok_response
    {
      message: 'login succeeded',
      user_id: @user.user_id,
      email: @user.email,
      temporary: @user.temporary_flg
    }
  end
end
