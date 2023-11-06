#!/usr/bin/env bash

sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225

sudo mv /home/admin/csye-webapp.service /etc/systemd/system/csye-webapp.service
sudo chmod 755 /etc/systemd/system/csye-webapp.service
sudo chown root /etc/systemd/system/csye-webapp.service
sudo chgrp root /etc/systemd/system/csye-webapp.service

sudo systemctl daemon-reload
sudo systemctl enable csye-webapp
sudo systemctl start csye-webapp
# sudo systemctl stop csye-webapp

sudo apt update -y
sudo apt upgrade -y
sudo apt install curl -y
sudo apt-get install unzip -y
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update
sudo apt-get install nodejs -y
sudo apt install build-essential -y 
sudo apt install npm -y
sudo npm install -g newman
wget https://amazoncloudwatch-agent.s3.amazonaws.com/debian/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E /opt/aws/amazon-cloudwatch-agent.deb 
# sudo /usr/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/home/admin/cloudwatch-config.json
