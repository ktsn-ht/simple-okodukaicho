class UserMailer < ApplicationMailer
  default from: ENV['EMAIL']

  def sign_up_email
    @user = params[:user]
    @password = params[:password]
    @url = if Rails.env.production?
             "https://#{ENV['FRONT_HOST']}"
           else
             "http://#{ENV['FRONT_HOST']}"
           end
    mail(to: @user.email, subject: 'シンプルおこづかい帳 仮登録完了のご案内')
  end
end
