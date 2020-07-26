import React from 'react';
import {
    Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {buildChartData, apps, avgMetric, metrics} from "./util";
import {makeStyles} from "@material-ui/styles";

const customizedTick = (props) => {
    const {payload, x, y} = props;

    return (
        <text x={x} y={y} textAnchor={'start'} fill={'white'}>
            {payload.value}
        </text>
    );
};

const appToColor = apps.reduce((acc, app) => {
    let color;
    if (app.includes("jvm")) {
        color = "#d9380f";
    } else if (app.includes("quarkus")) {
        color = "#4594ea";
    } else if (app.includes("node")) {
        color = "#339834";
    } else if (app.includes("micronaut")) {
        color = "#1a181a";
    }
    acc[app] = color
    return acc;
}, {})

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function OverviewRadar() {
    const [appSelection, setAppSelection] = React.useState(apps.reduce((isAppSelected, app) => {
        isAppSelected[app] = true;
        return isAppSelected;
    }, {}));
    const [appOpacity, setAppOpacity] = React.useState(apps.reduce((appOpacity, app) => {
        appOpacity[app] = 0.5;
        return appOpacity;
    }, {}));
    const [chartData, setChartData] = React.useState(buildChartData());
    const [selectedMetric, setSelectedMetric] = React.useState(avgMetric);
    const classes = useStyles();
    const selectedApps = (selection = appSelection) => apps.reduce((acc, app) => {
        if (selection[app]) acc.push(app);
        return acc;
    }, [])
    return (
        <Box>
            <Grid container direction="row">
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Latency Metric</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedMetric}
                            onChange={(event) => {
                                setSelectedMetric(event.target.value);
                                setChartData(buildChartData(event.target.value, selectedApps()));
                            }}
                        >
                            {metrics.map(metric =>
                                <MenuItem key={metric} value={metric}>{metric}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item>
                <RadarChart cx={300} cy={200} outerRadius={175} width={600} height={500} data={chartData}>
                    <PolarGrid/>
                    <PolarAngleAxis dataKey="kpi" tick={customizedTick}/>
                    {/*<PolarRadiusAxis angle={90} domain={[0, 10]}/>*/}
                    {apps.map(((app, idx) => (
                        <Radar key={app} name={app} dataKey={app} stroke={appToColor[app]} fill={appToColor[app]}
                               fillOpacity={appOpacity[app]}
                               strokeOpacity={appOpacity[app]}
                        />
                    )))}
                    {/*<Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />*/}
                    {/*<Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6}/>*/}
                    <Legend layout="vertical" align="center" iconType="triangle" onMouseEnter={(e) => {
                        const {dataKey} = e;
                        setAppOpacity(apps.reduce((appOpacity, app) => {
                            appOpacity[app] = app === dataKey ? 1.0 : 0.1;
                            return appOpacity;
                        }, {}))
                    }} onMouseLeave={(e) => {
                        setAppOpacity(apps.reduce((appOpacity, app) => {
                            appOpacity[app] = 0.5;
                            return appOpacity;
                        }, {}))
                    }} onClick={(e) => {
                        const {dataKey} = e;
                        const newState = {
                            ...appSelection,
                            [dataKey]: !appSelection[dataKey]
                        };
                        setAppSelection(newState);
                        setChartData(buildChartData(selectedMetric, selectedApps(newState)))
                    }}/>
                </RadarChart>
            </Grid>
        </Box>)
}
