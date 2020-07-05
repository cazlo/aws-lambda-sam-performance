users = 1
userHatchRate = 2
testRunTime = 5s
waitTime = 10m
testIterations = 20

micronaut2api = yvxxfw2nf2
micronaut136api = 6ug86qoohk
quarkusProxyApi = rksi40q0tc
quarkusProxyJvmApi = k08yn9unn7
quarkusEventHandlerApi = latepwscb1
quarkusEventHandlerJvmApi = koxopg3ndf
nodeExpressApi = ombtv0cn50
nodeExpressTypescriptApi = atdz8guafb

load-local:
	docker run --rm --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u 2 -r 2 \
		--host http://127.0.0.1:3000

load-micronaut-2:
	docker run --rm --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(micronaut2api).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs docker logs -f >> micronaut-2.log 2>&1

load-micronaut-1-3-6:
	docker run --rm --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(micronaut136api).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs docker logs -f >> micronaut-1-3-6.log 2>&1

load-quarkus-proxy:
	docker run --rm --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusProxyApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs docker logs -f >> quarkus-proxy.log 2>&1

load-quarkus-proxy-jvm:
	docker run --rm --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusProxyJvmApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs docker logs -f >> quarkus-proxy-jvm.log 2>&1

load-quarkus-event-handler:
	docker run --rm --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusEventHandlerApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs docker logs -f >> quarkus-event-handler.log 2>&1

load-quarkus-event-handler-jvm:
	docker run --rm --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusEventHandlerJvmApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs docker logs -f >> quarkus-event-handler-jvm.log 2>&1

load-node-express:
	docker run --rm --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(nodeExpressApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs docker logs -f >> node-express.log 2>&1

load-node-express-typescript:
	docker run --rm --network host -v $(CURDIR):/mnt/locust -d locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
 		--headless -u $(users) -r $(userHatchRate) \
 		--host https://$(nodeExpressTypescriptApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs docker logs -f >> node-express-typescript.log 2>&1

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
	i=0; while [ "$$i" -le $(testIterations) ]; do \
        $(MAKE) load-all-remote; sleep $(waitTime); i=$$((i + 10));\
	done