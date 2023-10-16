#!/usr/bin/env bash

sudo apt update -y
sudo apt upgrade -y
sudo apt install curl -y
sudo apt-get install unzip -y
curl -sL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh -y
sudo apt install nodejs -y
sudo apt install build-essential -y 
sudo apt install npm -y
sudo npm install -g newman
sudo DEBIAN_FRONTEND=noninteractive apt install mariadb-server -y
sudo mysql -e "SET PASSWORD FOR 'root'@'localhost' = PASSWORD('root')"
sudo mysql -e "GRANT ALL PRIVILEGES ON database_name.* TO 'root'@'localhost' IDENTIFIED BY 'root'"
sudo mysql -u root -proot  -e "FLUSH PRIVILEGES"
sudo mysql -u root -proot  -e "CREATE DATABASE webapp"
