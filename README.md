[![pr-ci-build](https://github.com/neu-ramya/webapp/actions/workflows/pr_ci_build.yml/badge.svg)](https://github.com/neu-ramya/webapp/actions/workflows/pr_ci_build.yml)
# csye6225-fall2023 webapp

## Assignment 5

### Objectives

- To understand APIs and HTTP response codes
- To understand CI pipeline with the use of GitHub actions
- To familiarize with using Digital Ocean

### Building from source

- create a Debian12 droplet following steps from https://docs.digitalocean.com/products/droplets/how-to/create/ 
- SSH into Debian12 using 'ssh -i ~/.ssh/digitalocean root@ip_address'
- Install MariaDB in Debian12 following steps from https://linuxgenie.net/how-to-install-mariadb-on-debian-12-bookworm-distribution/
- Create a database named 'webapp' in mariaDB
- Install unzip using 'sudo apt-get install unzip'
- Unzip the webapp file in Debian12 using 'unzip file.zip -d destination_folder'
- Remove node modules and package if it exists using 'rm -rf node_modules' and 'rm package-lock.json'
- Inside the webapp install Node using 'sudo apt install nodejs' and 'sudo apt install build-essential'
- Inside the webapp install Node Npm using 'sudo apt install npm -y'
- Install newman using 'sudo npm install -g newman'

### Demo purpose

- Inside the webapp, install npm using 'npm install'
- Run the npm using 'npm run dev'
- Run the integration tests using 'newman run webapp/tests/integration-tests/CSYE-webapp.postman_collection.json'