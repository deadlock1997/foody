//welcome, totalCalories, recipeOfTheDay, exploreRecipes, recentLog, graph, quickLinks

import { SxProps, Theme } from "@mui/system";

export const mainBox: SxProps<Theme> = {
  display: "grid",
  gap: 2,

  gridTemplateColumns: {
    xl: "repeat(4, 1fr)", // 4 columns for xl
    lg: "repeat(4, 1fr)", // 4 columns for lg
    md: "repeat(2, 1fr)", // 2 columns for md
    sm: "1fr", // 1 column for sm
  },
  gridTemplateRows: {
    xl: "repeat(2, auto)", // 2 rows for xl
    lg: "repeat(3, auto)", // 3 rows for lg
    md: "repeat(6, auto)", // 6 rows for md
    xs: "repeat(7, auto)", // 7 rows for xs
  },

  // Child elements
  "& .welcome": {
    gridArea: {
      xl: "1 / 1 / 2 / 2", // div1's grid area for xl
      lg: "1 / 1 / 2 / 2", // div1's grid area for lg
      md: "1 / 1 / 2 / 2", // div1's grid area for md
      sm: "1 / 1 / 2 / 2", // div1's grid area for sm
    },
  },
  "& .totalCalories": {
    gridArea: {
      xl: "1 / 2 / 2 / 3", // div2's grid area for xl
      lg: "1 / 2 / 2 / 3", // div2's grid area for lg
      md: "1 / 2 / 2 / 3", // div2's grid area for md
      sm: "2 / 1 / 3 / 2", // div2's grid area for sm
    },
  },
  "& .recipeOfTheDay": {
    gridArea: {
      xl: "1 / 3 / 2 / 4", // div3's grid area for xl
      lg: "1 / 3 / 2 / 4", // div3's grid area for lg
      md: "2 / 1 / 3 / 2", // div3's grid area for md
      sm: "3 / 1 / 4 / 2", // div3's grid area for sm
    },
  },
  "& .exploreRecipes": {
    gridArea: {
      xl: "1 / 4 / 2 / 5", // div4's grid area for xl
      lg: "1 / 4 / 2 / 5", // div4's grid area for lg
      md: "2 / 2 / 3 / 3", // div4's grid area for md
      sm: "4 / 1 / 5 / 2", // div4's grid area for sm
    },
  },
  "& .recentLog": {
    gridArea: {
      xl: "2 / 1 / 3 / 3", // div5's grid area for xl
      lg: "2 / 1 / 3 / 3", // div5's grid area for lg
      md: "3 / 1 / 4 / 3", // div5's grid area for md
      sm: "5 / 1 / 6 / 2", // div5's grid area for sm
    },
  },
  "& .graph": {
    gridArea: {
      xl: "2 / 3 / 3 / 5", // div6's grid area for xl
      lg: "2 / 3 / 3 / 5", // div6's grid area for lg
      md: "4 / 1 / 5 / 3", // div6's grid area for md
      sm: "6 / 1 / 7 / 2", // div6's grid area for sm
    },
  },
};

export const exploreButtonStyle: SxProps<Theme> = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  backgroundColor: "secondary.main",
  padding: 3,
  display: "flex",
  alignItems: "flex-end", // Title at the bottom
  justifyContent: "space-between",
  color: "#fff",
};

export const exploreTitleStyle: SxProps<Theme> = {
  textTransform: "capitalize",
  fontWeight: "bold",
  color: "#fff",
  display: "flex",
  alignItems: "center",
};
