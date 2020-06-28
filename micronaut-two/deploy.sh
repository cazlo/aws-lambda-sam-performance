#!/bin/bash
docker build . -t micronaut-two
mkdir -p build
docker run --rm --entrypoint cat micronaut-two  /home/application/function.zip > build/function.zip
sam local start-api -t sam.yaml -p 3000