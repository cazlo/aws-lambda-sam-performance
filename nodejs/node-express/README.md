# Node Express Lambda
An example microservice running with AWS's SAM utilizing
- AWS Lambda
- API Gateway
- NodeJS
- Express

## Running
Create the packaged lambda artifact, `function.zip`
```shell script
make build
```
Run it using sam-local:
```shell script
make sam-local
```

### Live reload
This app features a live reloading SAM environment.
This can be handy when doing local development as it does not require rebuilding the
 `function.zip` artifact in between test runs.
Run it using:
```shell script
make sam-local-unpackaged
```

## Deploying
Deployment is handled via the SAM Cloudformation transform.
This is abstracted into a single make command:
```shell script
make deploy
```

### Pre-requisites
1. Create S3 bucket for the lambda deployment artifacts
2. Configure S3 bucket name from step 1 in the project's [Makefile](./Makefile) in the `artifactBucketName` variable.
3. Create deploy IAM roles with access to several things:
    - uploading to the S3 deployment artifact bucket
    - managing lambda deployment
    - managing api gateway deployment