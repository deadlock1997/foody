import { SxProps, Theme } from "@mui/material/styles";

export const dashboardCardContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

export const titleBox: SxProps<Theme> = {
  px: 2,
  py: 1,
  borderWidth: 1,
  borderStyle: "solid",
  display: "flex",
  alignItems: "center",
  gap: 4,
};

export const titleTypography: SxProps<Theme> = {
  fontWeight: "bold",
};

export const titleDivider: SxProps<Theme> = {
  flexGrow: 1,
  height: "2px",
};

export const childrenBox: SxProps<Theme> = {
  border: 1,
  flex: 1,
};