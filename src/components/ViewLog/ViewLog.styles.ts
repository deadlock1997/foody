import { SxProps, Theme } from "@mui/system";

export const tableStyles: SxProps<Theme> = {
  borderTop: "1px solid black",
  "& .MuiTableCell-head": {
    fontWeight: "bold",
    borderBottom: "1px solid black",
  },
};

export const formControlStyles: SxProps<Theme> = {
  "& .MuiFormControl-root": {
    marginBottom: 2,
  },
};