#!/bin/bash

cd /var/www
forever stop index.js
git pull origin master
forever start index.js