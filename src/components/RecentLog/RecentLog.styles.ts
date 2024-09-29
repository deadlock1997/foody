import { SxProps, Theme } from "@mui/system";

export const tableHeadCellStyle: SxProps<Theme> = {
  fontWeight: "bold",
};

export const tableCellStyle: SxProps<Theme> = {
  color: "text.primary",
};

export const tableFooterStyle: SxProps<Theme> = {
  textAlign: "end",
};

export const noDataBox: SxProps<Theme> = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};