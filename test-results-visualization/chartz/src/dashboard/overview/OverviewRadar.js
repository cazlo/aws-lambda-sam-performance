import React from 'react';
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {buildChartData, apps, metrics, buildCases} from "./util";
import {makeStyles} from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Icon from "@material-ui/core/Icon";

const customizedTick = (props) => {
    const {payload, x, y, textAnchor} = props;
    const anchor = payload.value === 'latency' ? 'start' : textAnchor;
    return (
        <text x={x} y={y} text-anchor={anchor} fill={'white'}>
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

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function OverviewRadar() {
    const classes = useStyles();

    const [appSelection, setAppSelection] = React.useState(apps.reduce((isAppSelected, app) => {
        isAppSelected[app] = true;
        return isAppSelected;
    }, {}));
    const [appOpacity, setAppOpacity] = React.useState(apps.reduce((appOpacity, app) => {
        appOpacity[app] = 0.5;
        return appOpacity;
    }, {}));
    const [chartData, setChartData] = React.useState(buildChartData());
    const [selectedLatency, setSelectedLatency] = React.useState("p75");
    const [selectedBuild, setSelectedBuild] = React.useState(buildCases[0]);
    const [selectedMemory, setSelectedMemory] = React.useState("p75");
    const selectedApps = (selection = appSelection) => apps.reduce((acc, app) => {
        if (selection[app]) acc.push(app);
        return acc;
    }, [])
    const sortedApps =  stableSort(apps, (app1, app2) =>
        (chartData[0][app2] + chartData[1][app2] + chartData[2][app2]) - (chartData[0][app1] + chartData[1][app1] + chartData[2][app1]))
    return (
        <Box>
            <Grid container direction="row" alignContent="space-around" spacing={3}>
                <Grid container direction="column" alignContent="space-around" spacing={3} xs={3}>
                    <Grid item >
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Latency Metric</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedLatency}
                                onChange={(event) => {
                                    setSelectedLatency(event.target.value);
                                    setChartData(buildChartData(event.target.value, selectedBuild, selectedMemory));
                                }}
                            >
                                {metrics.map(metric =>
                                    <MenuItem key={metric} value={metric}>{metric}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item >
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Build Metric</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedBuild}
                                onChange={(event) => {
                                    setSelectedBuild(event.target.value);
                                    setChartData(buildChartData(selectedLatency, event.target.value, selectedMemory));
                                }}
                            >
                                {buildCases.map(build =>
                                    <MenuItem key={build} value={build}>{build}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item >
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Memory Metric</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedMemory}
                                onChange={(event) => {
                                    setSelectedMemory(event.target.value);
                                    setChartData(buildChartData(selectedLatency, selectedBuild, event.target.value));
                                }}
                            >
                                {metrics.map(metric =>
                                    <MenuItem key={metric} value={metric}>{metric}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={3} alignContent="space-around">
                    <RadarChart cx={300} cy={200} outerRadius={175} width={600} height={300} data={chartData}>
                        <PolarGrid/>
                        <PolarAngleAxis dataKey="kpi" tick={customizedTick}/>
                        <PolarRadiusAxis angle={90} domain={[0, 10]} orientation="left" tickCount={11} />
                        {selectedApps().map(((app, idx) => (
                            <Radar key={app} name={app} dataKey={app} stroke={appToColor[app]} fill={appToColor[app]}
                                   fillOpacity={appOpacity[app]}
                                   strokeOpacity={appOpacity[app]}
                            />
                        )))}
                    </RadarChart>
                </Grid>
                <Grid item xs={12} alignContent="space-around">
                    <Grid item >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Display</TableCell>
                                    <TableCell>Framework</TableCell>
                                    <TableCell>Total Score</TableCell>
                                    <TableCell>Latency</TableCell>
                                    <TableCell>Memory</TableCell>
                                    <TableCell>Build</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedApps.map((app, idx) =>
                                    <TableRow key={`${app}-rank-table-row`} hover
                                              onMouseEnter={(e) => {
                                                  setAppOpacity(apps.reduce((appOpacity, a) => {
                                                      appOpacity[a] = a === app ? 1.0 : 0.1;
                                                      return appOpacity;
                                                  }, {}))
                                              }}
                                              onMouseLeave={(e) => {
                                                    setAppOpacity(apps.reduce((appOpacity, a) => {
                                                        appOpacity[a] = 0.5;
                                                        return appOpacity;
                                                    }, {}))
                                                }}
                                              onClick={(e) => {
                                                    const newState = {
                                                        ...appSelection,
                                                        [app]: !appSelection[app]
                                                    };
                                                    setAppSelection(newState);
                                                    setChartData(buildChartData(selectedLatency, selectedBuild, selectedMemory))
                                                }}
                                    >
                                        <TableCell><Icon style={{color:appToColor[app]}}>{appSelection[app] ? "check-outline" : "close-box-outline"}</Icon></TableCell>
                                        <TableCell>{app}</TableCell>
                                        <TableCell>{Math.round(chartData[0][app] + chartData[1][app] + chartData[2][app])}</TableCell>
                                        <TableCell>{Math.round(chartData[0][app])}</TableCell>
                                        <TableCell>{Math.round(chartData[1][app])}</TableCell>
                                        <TableCell>{Math.round(chartData[2][app])}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Grid>
        </Box>)
}
