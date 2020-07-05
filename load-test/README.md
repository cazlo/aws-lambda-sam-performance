# Load test

A lightweight load test used throw some traffic at these SAM APIs to see if any trends get teased out.

## Running GUI

There is a UI provided by locust.io which facilitates manually tuning parameters until the desired throughput is achieved.
Once discovered, these parameters can then be used to run the CLI load test.

```shell script
docker run --network host -v $PWD:/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py
```

## Running CLI Load Test

Parameters for a few different scenarios are setup via makefile
These load tests are uniquely setup to investigate cold start impact in that they simulate a burst of traffic
 followed by a waiting period.  The idea is during this waiting period AWS will spin down whatever lambdas
 it has kept warm, effectively forcing a cold start on the next test run.

### Quick Ramp Up
This is a load test which quickly throws bursts of high throughput traffic at the APIs in question.
```shell script
make quick-ramp-load-test
```
### Spiky High Throughput Traffic
This is a load test which throws spikes of somewhat consistent traffic for a longer duration than the 
 quick ramp up test.
```shell script
make spiky-load-test
```
### Consistently High Throughput Traffic
This is a load test which consistently sends the same throughput for a long period of time.
```shell script
make consistent-throughput-load-test
```