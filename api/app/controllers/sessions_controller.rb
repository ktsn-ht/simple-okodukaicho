class SessionsController < ApplicationController
  skip_before_action :verify_jwt, only: [:create]

  def new; end

  def create
    user = User.find_by(user_id: params[:user_id])
    if user&.authenticate(params[:password])
      update_jwt(user.user_id)
      render json: { message: 'login succeed' }, status: :ok
    else
      render json: { message: 'user not found' }, status: :unauthorized
    end
  end

  def destroy; end
end
