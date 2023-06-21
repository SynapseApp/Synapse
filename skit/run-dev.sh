#! /usr/bin/env bash

clear
echo "================ DEVELOPEMENT ENVIROMENT STARTING ================"
echo ""
cd ./client && npm run dev &
cd ./server && npm run dev && fg