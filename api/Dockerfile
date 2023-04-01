FROM ruby:3.1.3
WORKDIR /work/api

# 一般ユーザーの追加
ARG USERNAME=user
ARG GROUPNAME=user
ARG UID=1000
ARG GID=1000

RUN groupadd -g $GID $GROUPNAME \
 && useradd -m -s /bin/bash -u $UID -g $GID $USERNAME \
 && ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

USER $USERNAME

# gemインストール
COPY Gemfile /work/api
COPY Gemfile.lock /work/api

RUN bundle install \
 && echo 'alias be="bundle exec"' >> /home/user/.bashrc


# - 新規プロジェクト作成
# be rails new . -f -d postgresql --skip-turbolinks --skip-test --api
