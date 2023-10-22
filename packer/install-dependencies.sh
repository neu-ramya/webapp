#!/usr/bin/env bash

sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225

sudo mv /home/admin/csye-webapp.service /etc/systemd/system/csye-webapp.service
sudo chmod 777 /etc/systemd/system/csye-webapp.service
sudo chown root /etc/systemd/system/csye-webapp.service
sudo chgrp root /etc/systemd/system/csye-webapp.service
sudo systemctl daemon-reload
sudo systemctl enable csye-webapp

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
sudo mysql -e "SET PASSWORD FOR '$1'@'localhost' = PASSWORD('$2')"
sudo mysql -e "GRANT ALL PRIVILEGES ON database_name.* TO '$1'@'localhost' IDENTIFIED BY '$2'"
sudo mysql -u "$1" -p"$2"  -e "FLUSH PRIVILEGES"
sudo mysql -u "$1" -p"$2"  -e "CREATE DATABASE webapp"
