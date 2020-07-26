outDir = output
generatedQuery = latency-query-generated.json
resultsDir = result

all:
	$(MAKE) -e metricName=Latency            -e queryName=overall     -e period=5184000  extractMetric && \
	$(MAKE) -e metricName=IntegrationLatency -e queryName=overall     -e period=5184000  extractMetric && \
	$(MAKE) -e metricName=Latency            -e queryName=time-series -e period=3600     extractMetric && \
	$(MAKE) -e metricName=IntegrationLatency -e queryName=time-series -e period=3600     extractMetric && \
	$(MAKE) clean

extractMetric:
	$(MAKE) clean setup && \
	$(MAKE) -e app=micronaut-one-three-six            generateQuery extractLatencyMetrics && \
	$(MAKE) -e app=micronaut-two                      generateQuery extractLatencyMetrics && \
	$(MAKE) -e app=node-express                       generateQuery extractLatencyMetrics && \
	$(MAKE) -e app=node-express-typescript            generateQuery extractLatencyMetrics && \
	$(MAKE) -e app=quarkus-api-gw-event-handler       generateQuery extractLatencyMetrics && \
	$(MAKE) -e app=quarkus-api-gw-proxy               generateQuery extractLatencyMetrics && \
	$(MAKE) -e app=quarkus-api-gw-proxy-jvm           generateQuery extractLatencyMetrics && \
	$(MAKE) -e app=quarkus-api-gw-event-handler-jvm   generateQuery extractLatencyMetrics && \
	rm -f $(outDir)/$(generatedQuery) && \
	$(MAKE) transformLatencyMetrics

clean:
	rm -rf $(outDir)

setup:
	mkdir -p $(outDir) && mkdir -p $(resultsDir)

generateQuery:
	sed 's/APINAME/$(app)/g' queries/overall.json | \
    sed 's/METRICNAME/$(metricName)/g' | \
    sed 's/PERIOD/$(period)/g' > $(outDir)/$(generatedQuery)

extractLatencyMetrics:
	aws cloudwatch get-metric-data --metric-data-queries file://./$(outDir)/$(generatedQuery) \
	 	--start-time 2020-07-02T04:00:00Z \
	 	--end-time 2020-07-26T10:25:00Z \
	 	> $(outDir)/latency-data-$(app).json

transformLatencyMetrics:
	node transformer.js > $(resultsDir)/$(metricName)-$(queryName).json


