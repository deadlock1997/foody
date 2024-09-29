"use client";
import { createTheme, Theme } from "@mui/material";
export const lightTheme: Theme = createTheme({
  cssVariables: true,
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1280,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    mode: "light",
    primary: {
      main: "#FE3508",
    },
    secondary: {
      main: "#355a15",
    },
    background: {
      default: "#FFFDF1",
      paper: "#FFFDF1",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides() {
        return `
        * {
          border-radius: 0px;
        }
        `;
      },
    },
    MuiAppBar: {
      defaultProps: {
        sx: { minHeight: "70px" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
          fontWeight: "bold",
          boxShadow: "none",
          ":hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiToggleButton: {
      defaultProps: {
        sx: { borderRadius: "0px" },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.lets-get": {
            fontFamily: "var(--font-dancing-script)",
          },
          "&.your-food": {
            fontFamily: "var(--font-allura)",
          },
          "&.roboto": {
            fontFamily: "var(--font-roboto)",
          },
        },
      },
      defaultProps: {
        color: "text.primary",
      },
    },
    MuiDivider: {
      defaultProps: {
        sx: {
          borderColor: "text.primary",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "standard",
        slotProps: {
          inputLabel: {
            shrink: true,
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        sx: { color: "text.primary" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiPaper-root": {
            borderRadius: "0px",
            border: "1px solid",
            borderColor: "text.primary",
            boxShadow: `black -5px 5px`,
          },
          "& .MuiDialogContent-root": {
            padding:
              "calc(2 * var(--mui-spacing)) calc(3 * var(--mui-spacing)) !important",
          },
          "& .MuiDialogActions-root": {
            padding:
              "calc(2 * var(--mui-spacing)) calc(3 * var(--mui-spacing)) !important",
          },
        },
      },
    },
  },
});
