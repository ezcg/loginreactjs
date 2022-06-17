#!/bin/bash

npm install
printf "\n\nRunning npm audit fix...\n\n"
npm audit fix
npm run-script startdev
