# aws-lambda-sam-performance
comparing performance characteristics of various ways of using AWS's SAM for lambdas

## Test Setup

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
   | stats avg(@duration) as avg, max(@duration) as max, min(@duration) as min, stddev(@duration) as dev by bin(1s)
   ```

## Test Results

### Summary

#### Cold Starts
| Framework | Location | Cold Start Count | Init Time (ms) | Cold Run Time (ms) | Total Latency (ms) | Total min (ms) | Total avg (ms) | Total p75 (ms) | Total max (ms) |  
|---|---|---|---|---|---|---|---|---|---|
|---|---|---|---|---|---|---|---|---|---|

#### Non-cold Starts

| Framework | Location | Request Count | Lambda Run Time (ms) | Total Latency (ms) | Latency min (ms) | Latency avg (ms) | Latency p75 (ms) | Latency max (ms) |  
|---|---|---|---|---|---|---|---|---|
|---|---|---|---|---|---|---|---|---|