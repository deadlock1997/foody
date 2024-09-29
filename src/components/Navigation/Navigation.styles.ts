import { SxProps, Theme } from "@mui/system";
import { CSSProperties } from "react";

export const nav_link_active: SxProps<Theme> = {
  color: "primary.main",
  fontWeight: "bold",
  textDecoration: "none",
  "&:hover": {
    color: "primary.main",
  },
};

export const nav_link: SxProps<Theme> = {
  color: "text.primary",
  textDecoration: "none",
  "&:hover": {
    color: "primary.main",
  },
};

export const navDivider: SxProps<Theme> = {
  my: 2,
  borderColor: "text.primary",
};

export const generalLinksBox: SxProps<Theme> = {
  display: "inline-flex",
  alignItems: "center",
  gap: 2,
  height: "inherit",
};

export const userLinksBox: SxProps<Theme> = {
  display: "inline-flex",
  alignItems: "center",
  gap: 2,
  height: "inherit",
};

export const quickLinksBox: SxProps<Theme> = {
  className: "quickLinks",
};

export const mobileNavBox: SxProps<Theme> = {
  textAlign: "end",
  px: 2,
  height: "inherit",
  display: { xs: "block", sm: "none" },
};

export const drawerPaperStyle: SxProps<Theme> = {
  "& .MuiDrawer-paper": {
    padding: 2,
  },
};

export const iconButtonStyle: SxProps<Theme> = {
  padding: 0,
};

export const foodyIconBoxStyle: CSSProperties = {
  height: "100%",
  objectFit: "contain",
  width: "auto",
}

export const LinksContainerStyle: SxProps<Theme> = {
    display: { xs: "none", sm: "block" },
    height: "inherit",
    px: 2,
    textAlign: "end",
  }