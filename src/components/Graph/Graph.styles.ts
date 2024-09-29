import { SxProps, Theme } from "@mui/system";

export const graphContainer: SxProps<Theme> = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: 2,
};

export const radioGroupBox: SxProps<Theme> = {
  flex: 0,
  display: "flex",
  justifyContent: "center",
};

export const lineChartSx: SxProps<Theme> = {
  "& .MuiAreaElement-series-calories": { fill: "#C96EF6" },
  "& .MuiAreaElement-series-fat": { fill: "#F0C350" },
  "& .MuiAreaElement-series-protein": { fill: "#3AA0EA" },
};