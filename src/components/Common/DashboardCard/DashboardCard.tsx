import { Box, Typography, Divider } from "@mui/material";
import React from "react";
import { dashboardCardContainer, titleBox, titleTypography, titleDivider, childrenBox } from "./Dashboard.styles";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  titleDividerColor: string;
  childBorderColor: string;
  titleBgColor: string;
  titleBorder: string;
  titleColor: string;
}

export default function DashboardCard(props: DashboardCardProps) {
  const {
    title,
    children,
    titleBorder,
    titleDividerColor,
    titleBgColor,
    childBorderColor,
    titleColor = "white",
  } = props;

  return (
    <Box sx={dashboardCardContainer}>
      <Box sx={{ pb: 1 }}>
        <Box
          sx={{
            ...titleBox,
            backgroundColor: titleBgColor,
            borderColor: titleBorder,
          }}
        >
          <Typography component="h3" sx={{ ...titleTypography, color: titleColor }}>
            {title}
          </Typography>
          <Divider
            sx={{ ...titleDivider, borderColor: titleDividerColor }}
          />
        </Box>
      </Box>
      <Box sx={{ ...childrenBox, borderColor: childBorderColor }}>
        {children}
      </Box>
    </Box>
  );
}