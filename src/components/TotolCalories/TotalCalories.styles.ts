import { SxProps, Theme } from "@mui/system";

export const mainBoxStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  height: "100%",
  backgroundColor: "#f9f9f9",
  alignItems: "stretch",
  borderRadius: 2,
};

export const macroStatStyle: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: 2,
  backgroundColor: "background.paper",
  width: "100%",
  textAlign: "center",
  flexGrow: 1,
  flexBasis: "0", 
  gap: 1,
  color: "#000",
};