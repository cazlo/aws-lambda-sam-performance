appName = micronaut-one-three-six
artifactBucketName = sam-perf-analysis-artifacts

build-function-zip:
		docker build -t $(appName) . && \
        mkdir -p build && \
        docker run --rm --entrypoint cat $(appName) /home/application/function.zip > build/function.zip
deploy:
		$(MAKE) cf-pkg && $(MAKE) cf-deploy
cf-pkg:
		aws cloudformation package \
		--template-file sam.yaml \
		--s3-bucket $(artifactBucketName) \
		--s3-prefix $(appName) \
		--output-template-file packaged.yaml
cf-deploy:
		aws cloudformation deploy \
		--no-fail-on-empty-changeset \
		--template-file packaged.yaml \
		--stack-name $(appName) \
		--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
		--tags app=$(appName)

sam-local:
		sam local start-api -t sam.yaml -p 3000