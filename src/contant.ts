import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

export const x_padding = { md: 16, sm: 4, xs: 2 };

export const nav_link: SxProps = {
  textDecoration: "none",
};

export const nav_link_active: SxProps = {};

export const SOMETHING_WENT_WRONG = "Something went wrong. Please try again.";

export const main_body: CSSProperties = {
  margin: 0,
  height: "100vh", // Ensure full height for the body
  position: "relative",
};

export const main_container: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "background.default",
  overflow: "auto",
};

export const main_content: SxProps<Theme> = {
  px: x_padding,
  py: 0,
  flexGrow: 1,
  position: "relative",
};
