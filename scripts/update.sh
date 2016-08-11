#!/bin/bash

cd /var/www
forever stop index.js
git pull origin release
npm install
forever start index.js