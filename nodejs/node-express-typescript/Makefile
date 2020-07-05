appName = node-express
artifactBucketName = sam-perf-analysis-artifacts
templateCfFileName = sam-packaged.yaml
templateCfUnpackagedFileName = sam.yaml
packagedCfFileName = packaged.yaml

#build-function-zip:
#		docker build -t $(appName) . && \
#        mkdir -p build && \
#        docker run --rm --entrypoint cat $(appName) /home/application/function.zip > build/function.zip
test:
	npm ci && \
	npm run lint && \
	npm run test-ci && \
	npm run test-int-ci

build:
	$(MAKE) test && \
	rm -rf build && mkdir -p build/function && \
	npm run build-ts && \
	rm -rf node_modules && \
	npm ci --production && \
	cp sam-packaged.yaml build/sam-packaged.yaml && \
	cp -r node_modules build/function/ && \
	cd build && zip -r function.zip function

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
	docker-compose -f docker-compose-sam-packaged.yaml up
sam-local-unpackaged:
	docker-compose -f docker-compose.yaml up

.PHONY: sam-local sam-local-unpackaged build test