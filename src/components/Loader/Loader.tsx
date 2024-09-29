import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { skeletonBox } from "./Loader.styles";

export default function Loader() {
  return (
    <Box
      sx={skeletonBox}
    >
      <CircularProgress />
    </Box>
  );
}
