FROM ubuntu:20.04

# bcrypt module (specifically node-gyp only works with stable/released versions of node. The list node version 12
# as latest stable, so installing node v12
# https://github.com/kelektiv/node.bcrypt.js#nodebcryptjs
RUN apt-get update -y && apt-get install -y vim net-tools curl gnupg wget telnetd build-essential python
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs lsof
RUN npm install nodemon -g
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update -y && apt -y install yarn
RUN yarn global add node-gyp

RUN echo "set number" > /root/.vimrc
RUN echo "alias ll='ls -ltr'" >> /root/.bashrc