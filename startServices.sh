#!/bin/bash
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac
echo Detected: ${machine}
if [ "$machine" = "Mac" ]; then
  echo "Staring PostgreSQL..."
  screen -dmS postgres /usr/local/bin/postgres
  echo "Starting Redis..."
  screen -dmS redis /usr/local/bin/redis-server
fi
if [ "$machine" = "Linux" ]; then
  echo "Staring PostgreSQL..."
  screen -dmS postgres /usr/bin/postgres
  echo "Starting Redis..."
  screen -dmS redis /usr/bin/redis-server
fi
screen -ls
