
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
import buildData from "../build/data";
import memoryData from "../memory/data";

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
    "max",
    "stdDev"
];
const buildCases = [
    "circleci",
    "devMachine"
]

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

const toSeconds = duration => {
    const minutesMatch = duration.match(/(\d.*)m.*/);
    const secondsMatch = duration.match(/(\d.*)m(\d.*)s/);
    const seconds = !secondsMatch ? 0 : Number.parseInt(secondsMatch[2], 10);
    return minutesMatch
        ? (minutesMatch[1] * 60) + seconds
        : seconds;
}

// builds report like: { circleci: {min: number, max: number}. devmachine: {min: number, max: number}, ...}
const buildMinMaxReport = apps.reduce((acc, app) => {
    const l = buildData[app];
    buildCases.forEach((buildCase)=>{
        if(!acc[buildCase]) acc[buildCase] = { min:Infinity, max:-Infinity };
        acc[buildCase] = {
            min: Math.min(...l[buildCase].map(toSeconds), acc[buildCase].min),
            max: Math.max(...l[buildCase].map(toSeconds), acc[buildCase].max),
        }
    })
    return acc;
}, {})

// builds report like: { min: {min: number, max: number}. avg: {min: number, max: number}, ...}
const memoryMinMaxReport = apps.reduce((acc, app) => {
    const l = memoryData[app];
    Object.keys(l).forEach((metric)=>{
        if(!acc[metric]) acc[metric] = { min:Infinity, max:-Infinity };
        acc[metric] = {
            min: Math.min(l[metric], acc[metric].min),
            max: Math.max(l[metric], acc[metric].max),
        }
    })
    return acc;
}, {})

const avgMetric = metrics[1];
const circleci = buildCases[0];
const buildChartData = (selectedLatencyMetric = "p75", selectedBuild = circleci, selectedMemoryMetric = "p75")=> {
    // changes data to range 0-10
    const normalizedLatencyData = apps.reduce((acc, app) => {
        const l = latencyData[app][selectedLatencyMetric];
        const min = latencyMinMaxReport[selectedLatencyMetric].min;
        const max = latencyMinMaxReport[selectedLatencyMetric].max;
        // 1- since lower values are better for latency kpi
        acc[app] = (1 - (l - min) / (max - min)) * 10
        return acc;
    }, {kpi: 'latency'});

    const normalizedMemoryData = apps.reduce((acc, app) => {
        const l = memoryData[app][selectedMemoryMetric];
        const min = memoryMinMaxReport[selectedMemoryMetric].min;
        const max = memoryMinMaxReport[selectedMemoryMetric].max;
        // 1- since lower values are better for memory kpi
        acc[app] = (1 - (l - min) / (max - min)) * 10
        return acc;
    }, { kpi: 'memory'})

    const normalizedBuildData = apps.reduce((acc, app) => {
        const l = buildData[app][selectedBuild];
        const sum = l.map(toSeconds).reduce((s, v) => s + v, 0);
        const avg = sum / l.length;
        const min = buildMinMaxReport[selectedBuild].min;
        const max = buildMinMaxReport[selectedBuild].max;
        // 1- since lower values are better for build kpi
        acc[app] = (1 - (avg - min) / (max - min)) * 10
        return acc;
    }, { kpi: 'build'})

    return [
        normalizedLatencyData,
        normalizedMemoryData,
        normalizedBuildData
    ];
}

export {
    buildChartData, apps, metrics, avgMetric, buildCases
}