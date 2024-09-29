import React from "react";
import { Skeleton, Box } from "@mui/material";
import { skeletonContainer, skeletonStyle } from "./Loader.styles";

const MinimalSkeletonLoader = () => {
  return (
    <Box sx={skeletonContainer}>
      {/* First Skeleton Loader */}
      <Skeleton height={40} sx={skeletonStyle} />

      {/* Second Skeleton Loader */}
      <Skeleton height={400} sx={skeletonStyle} />
    </Box>
  );
};

export default MinimalSkeletonLoader;