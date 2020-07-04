# SAM local Dockerized
SAM local is a utility which facilitates running your serverless applications locally in a
 lambda-like environment.
 
Back in the day you could go to the [aws-sam-cli](https://github.com/awslabs/aws-sam-cli/releases), download the
 tarfile for the version you were interested in, drop this tarfile in somewhere on the path, and you 
 were good to start SAM localing.
 
Unfortunately recently aws-sam-cli has changed distribution formats. Now the recommended way to get 
 the CLI installed in linux is using [brew](https://docs.brew.sh/Homebrew-on-Linux).
 At time of writing, there is not a way to lock down the brew install to a specific version.
 Locking the utility down to a specific version is a desired feature for using SAM local in a build pipeline;
 leaving the version of this dependency open can lead to non-deterministic builds.
 
## Current state
A Dockerfile can be used to install the latest available sam CLI version.  Run it with:
```shell script
make build-latest
``` 

## Future state
### Smaller, faster image
Right now the Docker image is really large, something like 500 MB.
The dockerfile can likely be optimi
### Automation around locking down to a specific version
Get this tagged by aws-cli version and published to docker hub.
Maintaining that could be automated.
Automated system to watch for releases to the aws-sam-cli project in github, maybe use RSS to trigger a bot which does the following:

1. extract version number from artifact tag in github
2. pull repo, change version to latest version found above
3. make PR against repo backing dockerhub distribution
4. PR triggers builds candidate and does some minimal verification that it was built successfuly  
   a. running docker container doing a `--version` should have a version number  
      maybe also check to see it contains the version number extracted from step 1  
   b. try running example lambda using built sam local container and assert it gets invoked successfully
5. PR manually merged to master after some approval.
6. Build on master pushes to DockerHub