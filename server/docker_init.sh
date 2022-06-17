#!/bin/bash

touch ~/.bashrc
echo "alias ll='ls -ltra'" >> ~/.bashrc

npm install nodemon -g
npm install
npm run-script startdev

