# Load test

A lightweight load test used throw some traffic at these SAM APIs to see if any trends get teased out.

## Running GUI

There is a UI provided by locust.io which facilitates manually tuning parameters until the desired throughput is achieved.
Once discovered, these parameters can then be used to run the CLI load test.

```shell script
docker run -p 8089:8089 --network host -v $PWD:/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py
```

## Running CLI Load Test

TODO document ideal parameters here once they are found
```shell script
users=100
userHatchRate=30
docker run -p 8089:8089 --network host -v $PWD:/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
 --headless -u $users -r $userHatchRate \
 --host http://127.0.0.1:3000
```