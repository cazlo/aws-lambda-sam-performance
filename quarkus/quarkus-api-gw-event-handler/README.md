# Quarkus SAM Lambda

## Running Locally
Build the deployment artifacts
```shell script
make build-function-zip
```
Run native image based lambda in SAM
```shell script
make sam-local
```
Run jvm based lambda in SAM
```shell script
make sam-local-jvm
```

## Deployment

### Pre-requisites
1. Create S3 bucket for the lambda deployment artifacts
2. Configure S3 bucket name in the project's [Makefile](./Makefile) in the `artifactBucketName` variable.
3. Create deploy IAM roles with access to several things:
    - uploading to the S3 deployment artifact bucket
    - managing lambda deployment
    - managing api gateway deployment
### Deployment
Run `make deploy` on some entity which is using the roles defined in deployment pre-req creation.

