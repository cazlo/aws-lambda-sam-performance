users = 15
userHatchRate = 2
testRunTime = 1m
waitTime = 5m

micronaut2api = yvxxfw2nf2
micronaut136api = 6ug86qoohk
quarkusProxyApi = rksi40q0tc
quarkusProxyJvmApi = k08yn9unn7
quarkusEventHandlerApi = latepwscb1
quarkusEventHandlerJvmApi = koxopg3ndf
nodeExpressApi = ombtv0cn50
nodeExpressTypescriptApi = atdz8guafb

load-local:
	docker run -p 8089:8089 --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u 2 -r 2 \
		--host http://127.0.0.1:3000

load-micronaut-2:
	docker run -p 8089:8089 --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(micronaut2api).execute-api.us-west-2.amazonaws.com/Prod \
		--run-time $(testRunTime)

load-micronaut-1-3-6:
	docker run -p 8089:8089 --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(micronaut136api).execute-api.us-west-2.amazonaws.com/Prod \
        --run-time $(testRunTime)

load-quarkus-proxy:
	docker run -p 8089:8089 --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusProxyApi).execute-api.us-west-2.amazonaws.com/Prod \
		--run-time $(testRunTime)

load-quarkus-proxy-jvm:
	docker run -p 8089:8089 --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusProxyJvmApi).execute-api.us-west-2.amazonaws.com/Prod \
		--run-time $(testRunTime)

load-quarkus-event-handler:
	docker run -p 8089:8089 --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusEventHandlerApi).execute-api.us-west-2.amazonaws.com/Prod \
		--run-time $(testRunTime)

load-quarkus-event-handler-jvm:
	docker run -p 8089:8089 --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusEventHandlerJvmApi).execute-api.us-west-2.amazonaws.com/Prod \
		--run-time $(testRunTime)

load-node-express:
	docker run -p 8089:8089 --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(nodeExpressApi).execute-api.us-west-2.amazonaws.com/Prod \
		--run-time $(testRunTime)

load-node-express-typescript:
	docker run -p 8089:8089 --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(nodeExpressTypescriptApi).execute-api.us-west-2.amazonaws.com/Prod \
		--run-time $(testRunTime)

load-all-remote:
	$(MAKE) load-micronaut-2 && \
	$(MAKE) load-micronaut-1-3-6 && \
	$(MAKE) load-quarkus-proxy && \
	$(MAKE) load-quarkus-proxy-jvm && \
	$(MAKE) load-quarkus-event-handler && \
	$(MAKE) load-quarkus-event-handler-jvm && \
	$(MAKE) load-node-express && \
	$(MAKE) load-node-express-typescript

spiky-load-test:
	number=1 ; while [[ $$number -le 10 ]] ; do \
  		((number = number + 1)); \
		$(MAKE) load-all-remote; \
		sleep $(waitTime);
	done