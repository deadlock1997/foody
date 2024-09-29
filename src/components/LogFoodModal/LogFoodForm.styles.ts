import { SxProps, Theme } from "@mui/material";

export const logFoodFormList: SxProps<Theme> = {
  "& .MuiListItem-root": {
    px: 0,
  },
};

export const gridContainer: SxProps<Theme> = {
  width: "100%",
};

export const formControlError: SxProps<Theme> = {
  marginLeft: 0,
  color: "error.main",
};