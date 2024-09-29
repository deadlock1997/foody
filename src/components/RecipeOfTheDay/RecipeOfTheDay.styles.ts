import { SxProps, Theme } from "@mui/system";
import { CSSProperties } from "react";

export const imageBoxStyle: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: 1,
};

export const imageStyle : CSSProperties= {
  objectFit: "contain", // Ensures image scales to fit within the box without distortion
};

export const titleBoxStyle: SxProps<Theme> = {
  textAlign: "center",
  px: 2,
  py: 1,
};