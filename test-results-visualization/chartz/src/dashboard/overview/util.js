
//{ latency data in shape
//  "micronaut-one-three-six": {
//   "min": 8,
//   "avg": 25.960118308867933,
//   "p75": 18.54256943985801,
//   "p95": 33.8254177578772,
//   "p99": 280.36927497828964,
//   "max": 3171,
//   "count": 210297
//  },..

import latencyData from "../../../../cloudwatch/etl/result/IntegrationLatency-overall";

const apps = [
    "micronaut-one-three-six",
    "micronaut-two",
    "node-express",
    "node-express-typescript",
    "quarkus-api-gw-event-handler",
    "quarkus-api-gw-proxy",
    "quarkus-api-gw-event-handler-jvm",
    "quarkus-api-gw-proxy-jvm"
];
const metrics = [
    "min",
    "avg",
    "p75",
    "p95",
    "p99",
    "max"
];

// builds report like: { min: {min: number, max: number}. avg: {min: number, max: number}, ...}
const latencyMinMaxReport = apps.reduce((acc, app) => {
    const l = latencyData[app];
    metrics.forEach((metric)=>{
        if(!acc[metric]) acc[metric] = { min:Infinity, max:-Infinity };
        acc[metric] = {
            min: Math.min(l[metric], acc[metric].min),
            max: Math.max(l[metric], acc[metric].max),
        }
    })
    return acc;
}, {})

const avgMetric = metrics[1];
const buildChartData = (selectedLatencyMetric = avgMetric, selectedApps = apps)=> {
    // changes data to range 0-10
    const normalizedLatencyData = selectedApps.reduce((acc, app) => {
        const l = latencyData[app][selectedLatencyMetric];
        const min = latencyMinMaxReport[selectedLatencyMetric].min;
        const max = latencyMinMaxReport[selectedLatencyMetric].max;
        // 1- since lower values are better for latency kpi
        acc[app] = (1 - (l - min) / (max - min))*10
        return acc;
    }, {kpi: 'latency'})

    return [
        normalizedLatencyData,
        { kpi: 'memory', ...(selectedApps.reduce((acc, app) => {
                acc[app] = Math.random() * 10; // todo real numbers
                return acc;
            }, {})) },
        { kpi: 'build', ...(selectedApps.reduce((acc, app) => {
                acc[app] = Math.random() * 10; // todo real numbers
                return acc;
            }, {})) },
    ];
}

export {
    buildChartData, apps, metrics, avgMetric
}