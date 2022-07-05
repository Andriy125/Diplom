#!/bin/bash

echo "====================Start====================="
sudo apt-get update -y
sudo apt install yarn -y
sudo apt install mariadb -y
sudo mkdir app && cd app
sudo git clone https://github.com/Andriy125/Diplom.git && cd Diplom/front
sudo yarn install -y
sudo yarn start
sudo cd ../back
sudo cp .env.example .env
sudo yarn install -y
sudo yarn start
echo "====================End====================="