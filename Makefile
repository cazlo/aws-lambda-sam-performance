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