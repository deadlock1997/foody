import { SxProps, Theme } from "@mui/material";

export const dialogPaper: SxProps<Theme> = {
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: "600px",
  },
};

export const dialogTitleStyle: SxProps<Theme> = {
  borderBottom: "1px solid",
  borderColor: "text.primary",
};

export const dialogContentStyle: SxProps<Theme> = {
  padding: 3,
};

export const dialogActionsStyle: SxProps<Theme> = {
  borderTop: "1px solid",
  borderColor: "text.primary",
};

export const alertStyle: SxProps<Theme> = {
  width: "100%",
};

export const emptyBoxFlex: SxProps<Theme> = { flexGrow: 1 }