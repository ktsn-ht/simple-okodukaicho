class SessionsController < ApplicationController
  skip_before_action :verify_jwt, only: [:create]

  def new
    render json: { message: 'login authenticated', user_id: @user.user_id }, status: :ok
  end

  def create
    @user = User.find_by(user_id: params[:user_id]) || User.find_by(email: params[:user_id])
    if @user&.authenticate(params[:password])
      update_jwt(@user.user_id)
      render json: { message: 'login succeeded', user_id: @user.user_id }, status: :ok
    else
      render json: { message: 'user not found' }, status: :unauthorized
    end
  end

  def destroy; end
end
