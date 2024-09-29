"use client";

import React from "react";
import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { graphContainer, lineChartSx, radioGroupBox } from "./Graph.styles";
import { TimeInterval, aggregateMealLogs } from "./Graph.utils";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Graph() {
  const [calories, setCalories] = React.useState<number[]>([]);
  const [protein, setProtein] = React.useState<number[]>([]);
  const [fat, setFat] = React.useState<number[]>([]);
  const [labels, setLabels] = React.useState<String[]>([]);
  const [interval, setInterval] = React.useState<TimeInterval>(TimeInterval.Day);
  const { totalConsumptionResponse, loading} = useSelector((state: RootState) => state.dashboard);

  React.useEffect(() => {
    const processedData = aggregateMealLogs(totalConsumptionResponse, interval);
    setLabels(processedData.map((item) => item.label));
    setCalories(processedData.map((item) => item.calories));
    setProtein(processedData.map((item) => item.protein));
    setFat(processedData.map((item) => item.fat));
  }, [interval, totalConsumptionResponse]);

  return (
    <Box sx={graphContainer}>
      <Box sx={{ height: "100%", flex: 1 }}>
        <LineChart
          loading={loading}
          series={[
            { id: "calories", data: calories, label: "Calories", area: true, stack: "total", showMark: false, color: "#C96EF6" },
            { id: "fat", data: fat, label: "Fat", area: true, stack: "total", showMark: false, color: "#F0C350" },
            { id: "protein", data: protein, label: "Protein", area: true, stack: "total", showMark: false, color: "#3AA0EA" },
          ]}
          xAxis={[{ scaleType: "point", data: labels }]}
          sx={lineChartSx}
        />
      </Box>
      <Box sx={radioGroupBox}>
        <FormControl>
          <RadioGroup
            aria-labelledby="time-interval-group"
            name="time-interval-group"
            value={interval}
            onChange={(e) => setInterval(e.target.value as TimeInterval)}
            row
          >
            <FormControlLabel value={TimeInterval.Day} control={<Radio />} label="Day" />
            <FormControlLabel value={TimeInterval.Week} control={<Radio />} label="Week" />
            <FormControlLabel value={TimeInterval.Month} control={<Radio />} label="Month" />
            <FormControlLabel value={TimeInterval.Year} control={<Radio />} label="Year" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
}