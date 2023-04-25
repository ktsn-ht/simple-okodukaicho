class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :verify_jwt

  def update_jwt(sub)
    rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))

    # JWTを生成
    payload = {
      iss: 'simple-okodukaicho',
      sub:,
      exp: (Time.zone.now + 7.days).to_i,
      iat: Time.zone.now.to_i
    }
    token = JWT.encode(payload, rsa_private, 'RS256')

    # CookieにJWTを保存
    cookies[:token] = { value: token, httponly: true, secure: true }
  end

  def verify_jwt
    rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))

    # CookieからJWTを取得
    token = cookies[:token]

    # JWTデコードの検証
    decoded_token = JWT.decode(token, rsa_private, true, { algorithm: 'RS256' })

    # JWTに含まれるユーザーIDの検証
    @user = User.find(decoded_token.first['sub'])
    raise JWT::DecodeError if @user.nil?

    # 検証成功の場合、JWTを更新
    update_jwt(@user.id)
  rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError
    render json: { message: 'jwt error' }, status: :forbidden
  end
end
