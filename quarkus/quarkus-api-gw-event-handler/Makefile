appName = quarkus-api-gw-event-handler
artifactBucketName = sam-perf-analysis-artifacts
templateFile = sam.native.yaml
templateFileJvm = sam.jvm.yaml

build-function-zip:
	docker build -t $(appName) . && \
	mkdir -p target && \
	docker run --rm --entrypoint cat $(appName) /usr/src/app/target/function.zip > target/function.zip && \
	docker run --rm --entrypoint cat $(appName) /usr/src/app/target/$(appName)-1.0-SNAPSHOT-runner.jar > target/$(appName)-1.0-SNAPSHOT-runner.jar
	#./mvnw clean package -Pnative -Dnative-image.docker-build=true

deploy:
		$(MAKE) cf-pkg && $(MAKE) cf-deploy
cf-pkg:
		aws cloudformation package \
		--template-file $(templateFile) \
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
		sam local start-api -t $(templateFile) -p 3000

deploy-jvm:
		$(MAKE) cf-pkg-jvm && $(MAKE) cf-deploy-jvm

cf-pkg-jvm:
		aws cloudformation package \
		--template-file $(templateFileJvm) \
		--s3-bucket $(artifactBucketName) \
		--s3-prefix $(appName)-jvm \
		--output-template-file packaged.yaml
cf-deploy-jvm:
		aws cloudformation deploy \
		--no-fail-on-empty-changeset \
		--template-file packaged.yaml \
		--stack-name $(appName)-jvm \
		--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
        --tags app=$(appName)-jvm
sam-local-jvm:
		sam local start-api -t $(templateFileJvm) -p 3000