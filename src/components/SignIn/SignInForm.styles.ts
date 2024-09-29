import { SxProps, Theme } from "@mui/system";

export const formContainer: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

export const formList: SxProps<Theme> ={ width: { xs: "100%", sm: "50%", md: "70%" }, p: 2 };


export const listItemSx : SxProps<Theme> = {
  p: 0,
  border: "1px solid",
  borderColor: "text.primary",
};

export const dividerSx: SxProps<Theme> = {
  borderColor: "text.primary",
};

export const textFieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
  },
};

export const loadingButtonSx: SxProps<Theme> = {
  borderRadius: 0,
  fontWeight: "bold",
};