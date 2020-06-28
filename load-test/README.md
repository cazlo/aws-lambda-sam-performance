# Load test

A lightweight load test used throw some traffic at these SAM APIs to see if any trends get teased out.

## Running GUI

There is a UI provided by locust.io which facilitates manually tuning parameters until the desired throughput is achieved.
Once discovered, these parameters can then be used to run the CLI load test.

```shell script
docker run -it -p 8089:8089 --volume $PWD/src/python:/mnt/locust -e LOCUSTFILE_PATH=/mnt/locust/locustfile.py -e TARGET_URL='https://' locustio/locust
```

## Running CLI Load Test

TODO document ideal parameters here once they are found