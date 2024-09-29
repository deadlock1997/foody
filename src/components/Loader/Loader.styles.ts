import { SxProps, Theme } from "@mui/material/styles";

export const skeletonContainer: SxProps<Theme> = {
  display: "block",
  padding: 0,
  margin: 0,
};

export const skeletonStyle: SxProps<Theme> = {
  margin: 0,
  padding: 0,
  display: "block",
  borderRadius: 0,
};

export const skeletonBox: SxProps<Theme> = {
  padding: 0,
  margin: 0,
  borderRadius: 0,
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};