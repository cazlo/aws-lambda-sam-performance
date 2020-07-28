build-micronaut-2:
		$(MAKE) -C micronaut/micronaut-two build-function-zip
deploy-micronaut-2:
		$(MAKE) -C micronaut/micronaut-two deploy

build-micronaut-1-3-6:
		$(MAKE) -C micronaut/micronaut-one-three-six build-function-zip
deploy-micronaut-1-3-6:
		$(MAKE) -C micronaut/micronaut-one-three-six deploy

build-quarkus-api-gw-proxy:
		$(MAKE) -C quarkus/quarkus-api-gw-proxy build-function-zip
deploy-quarkus-api-gw-proxy:
		$(MAKE) -C quarkus/quarkus-api-gw-proxy deploy
deploy-quarkus-api-gw-proxy-jvm:
		$(MAKE) -C quarkus/quarkus-api-gw-proxy deploy-jvm

build-quarkus-api-gw-event-handler:
		$(MAKE) -C quarkus/quarkus-api-gw-event-handler build-function-zip
deploy-quarkus-api-gw-event-handler:
		$(MAKE) -C quarkus/quarkus-api-gw-event-handler deploy
deploy-quarkus-api-gw-event-handler-jvm:
		$(MAKE) -C quarkus/quarkus-api-gw-event-handler deploy-jvm

build-node-express:
		$(MAKE) -C nodejs/node-express build
deploy-node-express:
		$(MAKE) -C nodejs/node-express deploy
build-node-express-typescript:
		$(MAKE) -C nodejs/node-express-typescript build
deploy-node-express-typescript:
		$(MAKE) -C nodejs/node-express-typescript deploy

perform-load-test-suite:
		$(MAKE) -C complete-test-run

build-latest-sam-local:
		$(MAKE) -C sam-local build

all:
	$(MAKE) build-latest-sam-local                && \
	$(MAKE) build-micronaut-2                     && \
	$(MAKE) build-micronaut-1-3-6                 && \
	$(MAKE) build-quarkus-api-gw-proxy            && \
	$(MAKE) build-quarkus-api-gw-event-handler    && \
	$(MAKE) build-node-express                    && \
	$(MAKE) build-node-express-typescript

timeABuild:
	i=1; while [ "$$i" -le $(testIterations) ]; do \
	    $(MAKE) clean; \
	    mkdir -p load-test/build/results/$(testName)/; \
	    echo "\n\n Begin Uncached Build $(testName) \n\n"; \
	    time -f'%es' make timeBuild 2>> load-test/build/results/$(testName)/uncached.txt; \
	    echo "\n\n Begin Cached Build $(testName) \n\n"; \
        time -f'%es' $(MAKE) timeBuild 2>> load-test/build/results/$(testName)/cached.txt; \
        i=$$((i + 1)); \
	done && \
	echo "\n\Build Time Test For $(testName) Completed :D\n\n"

timeBuild:
	 $(MAKE) --silent -e buildStepName=$(buildStepName) silentBuild > /dev/null
silentBuild:
	$(MAKE) --silent $(buildStepName) 2>&1 /dev/null

clean:
	docker system prune --all -f

timeAllBuilds:
	$(MAKE) -e buildStepName=build-micronaut-2                  testIterations=10 testName=micronaut-2                  timeABuild && \
	$(MAKE) -e buildStepName=build-micronaut-1-3-6              testIterations=10 testName=micronaut-1-3-6              timeABuild && \
	$(MAKE) -e buildStepName=build-quarkus-api-gw-proxy         testIterations=10 testName=quarkus-api-gw-proxy         timeABuild && \
	$(MAKE) -e buildStepName=build-quarkus-api-gw-event-handler testIterations=10 testName=quarkus-api-gw-event-handler timeABuild && \
	$(MAKE) -e buildStepName=build-node-express                 testIterations=10 testName=node-express                 timeABuild && \
	$(MAKE) -e buildStepName=build-node-express-typescript      testIterations=10 testName=node-express-typescript      timeABuild