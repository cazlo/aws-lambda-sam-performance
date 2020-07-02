appName = quarkus-api-gw-proxy
artifactBucketName = sam-perf-analysis-artifacts

build-function-zip:
	docker build -t $(appName) . && \
	mkdir -p target && \
	docker run --rm --entrypoint cat $(appName) /usr/src/app/target/function.zip > target/function.zip
	#./mvnw clean package -Pnative -Dnative-image.docker-build=true

deploy:
		$(MAKE) cf-pkg && $(MAKE) cf-deploy
cf-pkg:
		aws cloudformation package \
		--template-file sam.native.yaml \
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