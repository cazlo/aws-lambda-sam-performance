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
	docker run --rm --network host -v $(CURDIR):/mnt/locust: locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u 2 -r 2 \
		--csv=/mnt/locust/local \
		--host http://127.0.0.1:3000

load-micronaut-2:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(micronaut2api).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--csv=/mnt/locust/micronaut-2 \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> micronaut-2.log 2>&1'

load-micronaut-1-3-6:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(micronaut136api).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--csv=/mnt/locust/micronaut-1-3-6 \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> micronaut-1-3-6.log 2>&1'

load-quarkus-proxy:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusProxyApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--csv=/mnt/locust/quarkus-proxy \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> quarkus-proxy.log 2>&1'

load-quarkus-proxy-jvm:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusProxyJvmApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--csv=/mnt/locust/quarkus-proxy-jvm \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> quarkus-proxy-jvm.log 2>&1'

load-quarkus-event-handler:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusEventHandlerApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--csv=/mnt/locust/quarkus-event-handler \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> quarkus-event-handler.log 2>&1'

load-quarkus-event-handler-jvm:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(quarkusEventHandlerJvmApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--csv=/mnt/locust/quarkus-event-handler-jvm \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> quarkus-event-handler-jvm.log 2>&1'

load-node-express:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://$(nodeExpressApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--csv=/mnt/locust/node-express \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> node-express.log 2>&1'

load-node-express-typescript:
	docker run --rm -d --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
 		--headless -u $(users) -r $(userHatchRate) \
 		--host https://$(nodeExpressTypescriptApi).execute-api.us-west-2.amazonaws.com/Prod \
 		--only-summary \
 		--csv=/mnt/locust/node-express-typescript \
 		--run-time $(testRunTime) | xargs -I % sh -c 'docker logs -f % >> node-express-typescript.log 2>&1'

load-all-remote:
	$(MAKE) -j load-micronaut-2  \
	  load-micronaut-1-3-6  \
	  load-quarkus-proxy  \
	  load-quarkus-proxy-jvm  \
	  load-quarkus-event-handler  \
	  load-quarkus-event-handler-jvm  \
	  load-node-express \
	  load-node-express-typescript

load-all-remote-sequential:
	$(MAKE) load-micronaut-2  \
	  load-micronaut-1-3-6  \
	  load-quarkus-proxy  \
	  load-quarkus-proxy-jvm  \
	  load-quarkus-event-handler  \
	  load-quarkus-event-handler-jvm  \
	  load-node-express \
	  load-node-express-typescript

testName=none
datetime=$(shell date --iso=seconds)
loadTestStepName=load-all-remote
drive-traffic-saving-results:
	i=0; while [ "$$i" -le $(testIterations) ]; do \
        $(MAKE) clean $(loadTestStepName);\
        mkdir -p results/$(testName)/$(datetime)/$$i; \
       	mv *.log results/$(testName)/$(datetime)/$$i; \
       	mv *.csv results/$(testName)/$(datetime)/$$i; \
       	echo "Sleeping for a bit"; sleep $(waitTime); i=$$((i + 1)); \
	done && \
	echo "\n\nLoad Test Run $(testName) Completed :D\n\n"

clean:
	rm -f *.log && rm -f *.csv

quick-deploy-smokecheck:
	$(MAKE) -e testRunTime=5s testIterations=1 waitTime=1s drive-traffic-saving-results

spiky-load-test:
	$(MAKE) -e testRunTime=20s users=10 waitTime=15m testIterations=10 testName=spiky-load-test \
		drive-traffic-saving-results

quick-ramp-load-test:
	$(MAKE) -e testRunTime=5s users=100 userHatchRate=50 waitTime=15m testIterations=10 testName=quick-ramp-load-test loadTestStepName=load-all-remote-sequential \
		drive-traffic-saving-results

consistent-throughput-load-test:
	$(MAKE) -e testRunTime=60m users=2 userHatchRate=2 waitTime=15m testIterations=3 testName=consistent-throughput-load-test \
 		drive-traffic-saving-results

complete-test-run:
	echo '\n\n\nRunning spiky-load-test!!!!!!!!!!!!!!!!!!!!!!\n\n\n' && $(MAKE) spiky-load-test && sleep 10m && \
	echo '\n\n\nRunning quick-ramp-load-test!!!!!!!!!!!!!!!!!\n\n\n' && $(MAKE) quick-ramp-load-test && sleep 10m && \
	echo '\n\n\nRunning consistent-throughput-load-test!!!!!!\n\n\n' && $(MAKE) consistent-throughput-load-test