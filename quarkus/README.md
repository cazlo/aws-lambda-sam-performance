# quarkus + aws lambda + api gateway

## building

### fully dockerized
this will run the entire build (javac + tests + nativeimage) within a docker container 
```shell script
make build-function-zip
```

## credits 

Inspired by
```shell script
mvn archetype:generate \
       -DarchetypeGroupId=io.quarkus \
       -DarchetypeArtifactId=quarkus-amazon-lambda-http-archetype \
       -DarchetypeVersion=1.5.2.Final
```
\+
```shell script
mvn archetype:generate \
       -DarchetypeGroupId=io.quarkus \
       -DarchetypeArtifactId=quarkus-amazon-lambda-http-archetype \
       -DarchetypeVersion=1.6.0.CR1
```
\+
[aws-samples/aws-quarkus-demo](https://github.com/aws-samples/aws-quarkus-demo)     

       
