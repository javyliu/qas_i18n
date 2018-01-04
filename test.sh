#!/usr/bin/env sh
# Author: javy liu
#Date & Time: 2017-12-29 10:18:16
#Description: test read commond
echo "Enter release version:"
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo
echo "the reply is"

echo $REPLY

if [[ $REPLY =~ ^[yY]$ ]]; then
  echo "your answer is yes"
else
  echo "your answer is no"
fi

