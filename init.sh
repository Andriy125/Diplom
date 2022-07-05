#!/bin/bash

echo "====================Start====================="
sudo apt-get update -y
sudo apt install yarn -y
sudo apt install mariadb -y
sudo mkdir app && cd app
#sudo git clone https://github.com/Sofi-Fed-23/cloud_technologies_demo.git && cd front
cd front
sudo yarn install -y
sudo yarn start
sudo cd ..
sudo cd back
sudo cp .env.example .env
sudo yarn install -y
sudo yarn start
echo "====================End====================="