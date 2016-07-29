#!/bin/bash

cd /var/www
forever stop index.js
git pull origin master
npm install
forever start index.js