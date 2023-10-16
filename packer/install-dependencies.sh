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
sudo apt install mariadb-server -y
# sudo mariadb-secure-installation -y
sudo mysql -e "UPDATE mysql.user SET Password = PASSWORD('root') WHERE User = 'root'"
# sudo mysql -e "DROP USER ''@'localhost'"
# sudo mysql -e "DROP USER ''@'$(hostname)'"
# sudo mysql -e "DROP DATABASE test"
sudo mysql -e "GRANT ALL PRIVILEGES ON database_name.* TO 'root'@'localhost' IDENTIFIED BY 'root'"
sudo mysql -e "FLUSH PRIVILEGES"
sudo mysql -e "CREATE DATABASE webapp"
sudo mysql -e "SHOW DATABASES"