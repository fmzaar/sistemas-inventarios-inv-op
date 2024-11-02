#!/bin/bash

colRed=`tput setaf 1`
colReset=`tput sgr0`

envDefaultsFile=.env.defaults
envFile=.env

function noArguments() {
  echo "${colRed}Error: no arguments supplied.${colReset}"
  echo ""
  echo "Usage: ./with-env.sh directory command"
  echo ""
  echo "This script reads dotenv files and sets environment variables to the command that is passed as an argument."
  echo "It's useful to execute docker-compose commands without using pm2."

  exit
}

function noEnvDefaultFile() {
  echo "${colRed}Error: $envDefaultsFile does not exist.${colReset}"

  exit
}

if [ $# -eq 0 ]
  then
    noArguments
fi

if [ ! -f "$envDefaultsFile" ]; then
    noEnvDefaultFile
fi

if [ ! -f "$envFile" ]; then
  params=$(egrep -v '^#' .env.defaults | xargs)
else
  params=$(egrep -v '^#' .env.defaults | egrep -v '^#' .env | xargs)
fi

cd $1 && export $params; $2 $3 $4 $5
