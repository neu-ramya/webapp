[![pr-ci-build](https://github.com/neu-ramya/webapp/actions/workflows/pr_ci_build.yml/badge.svg)](https://github.com/neu-ramya/webapp/actions/workflows/pr_ci_build.yml)
# csye6225-fall2023 webapp

### Objectives

- To understand APIs and HTTP response codes
- To understand CI pipeline with the use of GitHub actions
- To familiarize with using Digital Ocean
- To create AMI using packer

### Building from source

#### webapp

Webapp has two endpoints as below.

- `/assignments`
  - This supports PUT, GET, DELETE, POST. For more information. Look at the swagger docs.
- `/healthz`
  - Checks for the DB connection and returns application status.

#### packer

- Build AMI using packer following the steps in https://developer.hashicorp.com/packer/tutorials/aws-get-started/aws-get-started-build-image
- Add required provisioners in the packer - provisioner to read the dependencies bash file for building the AMI

### Demo purpose

- Inside the webapp, install npm using 'npm install'
- Run the npm using 'npm run server'
- Run the integration tests using 'newman run webapp/tests/integration-tests/CSYE-webapp.postman_collection.json'
- Run the packer to build AMI using 'AWS_PROFILE=profile_name packer build ./packer/aws-debian.pkr.hcl'