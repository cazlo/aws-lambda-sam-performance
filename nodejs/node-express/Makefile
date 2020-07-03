appName = node-express
artifactBucketName = sam-perf-analysis-artifacts
templateCfFileName = sam-packaged.yaml
templateCfUnpackagedFileName = sam.yaml
packagedCfFileName = packaged.yaml

#build-function-zip:
#		docker build -t $(appName) . && \
#        mkdir -p build && \
#        docker run --rm --entrypoint cat $(appName) /home/application/function.zip > build/function.zip
build:
	npm install && \
	npm run lint && \
	npm run test && \
	rm -f function.zip && \
	zip -r function.zip node_modules && \
	zip function.zip index.js && \
	find src -name "*" -print | xargs zip function.zip
deploy:
	$(MAKE) cf-pkg && $(MAKE) cf-deploy
cf-pkg:
	aws cloudformation package \
		--template-file $(templateCfFileName) \
		--s3-bucket $(artifactBucketName) \
		--s3-prefix $(appName) \
		--output-template-file $(packagedCfFileName)
cf-deploy:
	aws cloudformation deploy \
		--no-fail-on-empty-changeset \
		--template-file $(packagedCfFileName) \
		--stack-name $(appName) \
		--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
        --tags app=$(appName)

sam-local:
	sam local start-api -t $(templateCfFileName) -p 3000
sam-local-unpackaged:
	sam local start-api -t $(templateCfUnpackagedFileName) -p 3000