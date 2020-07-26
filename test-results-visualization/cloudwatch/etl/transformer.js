const apps = [
    "micronaut-one-three-six",
    "micronaut-two",
    "node-express",
    "node-express-typescript",
    "quarkus-api-gw-event-handler",
    "quarkus-api-gw-event-handler-jvm",
    "quarkus-api-gw-proxy",
    "quarkus-api-gw-proxy-jvm"
];


/**
 * Transform many files each containing {MetricDataResults: [{Id: "Max", Timestamps:["T1", "T2"], Values:["V1", "V2"]}]}
 * into {app1:{Max:{T1:V1, T2:V2}}, app2:...}
 * or {app1:{Max:V1}, app2:...} if only 1 metric value
 * */
const mappedData = apps.reduce((acc, app) => {
    const data = require(`./output/latency-data-${app}.json`);
    acc[app] = data.MetricDataResults.reduce((appMetricsAcc, result) => {
        const metric = result.Id;
        appMetricsAcc[metric] = result.Values.length === 1
            ? result.Values[0]
            : result.Timestamps.reduce((metricAcc, time, idx) => {
                metricAcc[time] = result.Values[idx];
                return metricAcc;
            }, {});
        return appMetricsAcc;
    }, {});
    return acc;
}, {});

console.log(JSON.stringify(mappedData, undefined, 1));