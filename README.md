[![pr-ci-build](https://github.com/neu-ramya/webapp/actions/workflows/pr_ci_build.yml/badge.svg)](https://github.com/neu-ramya/webapp/actions/workflows/pr_ci_build.yml)
# csye6225-fall2023 webapp

### Objectives

- To understand APIs and HTTP response codes
- To understand CI pipeline with the use of GitHub actions
- To create AMI using packer
- Build AMI from github workflow actions
- Configure cloudwatch agent for the webapp

### Building from source

#### webapp


Webapp has two endpoints as below.

- `/assignments`
  - This supports PUT, GET, DELETE, POST. For more information, look at the swagger docs.
- `/healthz`
  - Checks for the DB connection and returns application status.

#### packer

- Build AMI using packer following the steps in https://developer.hashicorp.com/packer/tutorials/aws-get-started/aws-get-started-build-image
- Add required provisioners in the packer - provisioner to read the dependencies bash file for building the AMI
- Zip the webapp file while building the AMI to run it in the instance.
- Cloudwatch agent configuration file is attached while building the AMI

### Demo purpose

- Pulumi up to create instance with the most recent AMI created.
- Run the npm using 'npm run server' to run the webapp in the instance
- Run the integration tests using 'newman run webapp/tests/integration-tests/CSYE-webapp.postman_collection.json' or using postman application.


### Certificates

- Generate CSR using openSSL
sudo openssl genrsa -out namecheap.key 2048

- Create private key
sudo openssl req -new -key namecheap.key -out namecheap-csr.pem


- Certificate creation
AWS_DEFAULT_PROFILE=demo aws iam upload-server-certificate --server-certificate-name certificate_object_name --certificate-body file:///Users/ramya/Cloud/assignment_9/demo_ramyadevie.me/demo_ramyadevie_me.crt --private-key file:///Users/ramya/.ssh/namecheap.key --certificate-chain file:///Users/ramya/Cloud/assignment_9/demo_ramyadevie.me/demo_ramyadevie_me.ca-bundle

- List the certificate name
AWS_DEFAULT_PROFILE=demo aws iam get-server-certificate --server-certificate-name certificate_object_name

- Import certificate
AWS_DEFAULT_PROFILE=demo aws acm import-certificate \
    --certificate file:///Users/ramya/Cloud/assignment_9/demo_ramyadevie.me/demo_ramyadevie_me.crt \
    --private-key file:///Users/ramya/.ssh/namecheap.key \
    --certificate-chain file:///Users/ramya/Cloud/assignment_9/demo_ramyadevie.me/demo_ramyadevie_me.ca-bundle

- Attach certificate to load balancer
AWS_DEFAULT_PROFILE=demo aws elbv2 create-listener \
    --load-balancer-arn <ALB_ARN> \
    --protocol HTTPS \
    --port 443 \
    --ssl-policy ELBSecurityPolicy-2016-08 \
    --certificates CertificateArn=<CERT_ARN> \
    --default-actions Type=forward,TargetGroupArn=<TARGET_GROUP_ARN>