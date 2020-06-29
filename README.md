# aws-lambda-sam-performance
comparing performance characteristics of various ways of using AWS's SAM for lambdas

## Test Setup Notes

1. Do not exceed ~200 RPS for a single node. If more throughput than this is required,
   the load will need to be distributed across more than 1 node (laptop/EC2). In practice
   pushing a single node above ~200 RPS will actually lead to lower throughput overall.
2. Random network issues can and will happen, so don't weigh too heavily on outliers in the max, p99.
   The skewing effect of these events can be potentially minimized by performing many thousands
   or tens of thousands of requests and looking at the performance statistics as a whole.
   Recommended to look at min, avg, p75
3. Make sure to take measurements for 2 scenarios:  
    a. Traffic originating withing AWS.  Drive the load test from some EC2s in the same region as the lambdas  
    b. Traffic originating outside of AWS.  Drive the load test from a laptop.  To minimize the impact of latency,
       ensure that this test is performed from within the same region the lambdas are deployed to.
4. Make sure to get some visibility into when cold starts are happening and what the latency impact is for cold starts.
   This can be done with cloudwatch insights queries which regex out the `REPORT` lines from lambda logs:
   ```
   parse @message /REPORT.*Init Duration: (?<InitDuration>.*) ms/
   | fields @duration as ColdLambdaDuration, @duration + InitDuration as TotalColdStartDuration
   | filter ispresent(@duration) and ispresent(InitDuration)
   | stats count() as cnt, min(@duration) as min, avg(@duration) as avg, pct(@duration, 75) as p75, pct(@duration, 95) as p95, pct(@duration, 99) as p99,  stddev(@duration) as dev by bin(30s)
   ```
5. Memory use is part of cost function and should be measured.  
   ```
   parse @message /REPORT.*Max Memory Used: (?<MBused>.*) MB/
   | filter @message like "REPORT"
   | stats count() as cnt, min(MBused) as min, avg(MBused) as avg, pct(MBused, 75) as p75, pct(MBused, 95) as p95, pct(MBused, 99) as p99,  stddev(MBused) as dev by bin(60s)
   ``` 

## Test Results

### Summary

#### Cold Starts
| Framework | Location | Cold Start Count | Init Time (ms) | Cold Run Time (ms) | Total Latency (ms) | Total min (ms) | Total avg (ms) | Total p75 (ms) | Total max (ms) |  
|---|---|---|---|---|---|---|---|---|---|
|---|---|---|---|---|---|---|---|---|---|
|---|---|---|---|---|---|---|---|---|---|

#### Non-cold Starts

| Framework | Location | Request Count | Lambda Run Time (ms) | Total Latency (ms) | Latency min (ms) | Latency avg (ms) | Latency p75 (ms) | Latency max (ms) |  
|---|---|---|---|---|---|---|---|---|
|---|---|---|---|---|---|---|---|---|
|---|---|---|---|---|---|---|---|---|