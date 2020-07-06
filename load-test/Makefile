users = 7
userHatchRate = 2
testRunTime = 30s
waitTime = 15m
testIterations = 5

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
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(micronaut2api).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> micronaut-2.log 2>&1'

load-micronaut-1-3-6:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(micronaut136api).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> micronaut-1-3-6.log 2>&1'

load-quarkus-proxy:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusProxyApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> quarkus-proxy.log 2>&1'

load-quarkus-proxy-jvm:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusProxyJvmApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> quarkus-proxy-jvm.log 2>&1'

load-quarkus-event-handler:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusEventHandlerApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> quarkus-event-handler.log 2>&1'

load-quarkus-event-handler-jvm:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusEventHandlerJvmApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> quarkus-event-handler-jvm.log 2>&1'

load-node-express:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(nodeExpressApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> node-express.log 2>&1'

load-node-express-typescript:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
 		--headless -u $(users) -r $(userHatchRate) \
 		--host https://$(nodeExpressTypescriptApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> node-express-typescript.log 2>&1'

load-all-remote:
	$(MAKE) load-micronaut-2 && \
	$(MAKE) load-micronaut-1-3-6 && \
	$(MAKE) load-quarkus-proxy && \
	$(MAKE) load-quarkus-proxy-jvm && \
	$(MAKE) load-quarkus-event-handler && \
	$(MAKE) load-quarkus-event-handler-jvm && \
	$(MAKE) load-node-express && \
	$(MAKE) load-node-express-typescript

load-test-all-remote-for-a-while:
	i=0; while [ "$$i" -le $(testIterations) ]; do \
        $(MAKE) load-all-remote; echo "Sleeping for a bit"; sleep $(waitTime); i=$$((i + 1));\
	done && \
	echo "Load Test Completed :D"

clean:
	rm -f *.log

quick-deploy-smokecheck:
	$(MAKE) -e testRunTime=5s testIterations=1 waitTime=1s clean load-test-all-remote-for-a-while

datetime=$(shell date --iso=seconds)
spiky-load-test:
	$(MAKE) -e testRunTime=60s users=10 waitTime=15m testIterations=20 clean load-test-all-remote-for-a-while && \
	mkdir -p results/spiky-load-test/$(datetime) && \
	mv *.log results/spiky-load-test/$(datetime)

quick-ramp-load-test:
	$(MAKE) -e testRunTime=20s users=100 userHatchRate=50 waitTime=15m testIterations=20 clean load-test-all-remote-for-a-while && \
	mkdir -p results/quick-ramp-load-test/$(datetime) && \
	mv *.log results/quick-ramp-load-test/$(datetime)

consistent-throughput-load-test:
	$(MAKE) -e testRunTime=60m users=3 userHatchRate=3 waitTime=15m testIterations=2 clean load-test-all-remote-for-a-while && \
	mkdir -p results/quick-ramp-load-test/$(datetime) && \
	mv *.log results/quick-ramp-load-test/$(datetime)