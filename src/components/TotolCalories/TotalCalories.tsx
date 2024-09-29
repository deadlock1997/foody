import { Box, Typography, Divider } from "@mui/material";
import React from "react";
import DashboardCard from "../Common/DashboardCard/DashboardCard";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import EggIcon from "@mui/icons-material/Egg";
import OpacityIcon from "@mui/icons-material/Opacity";
import { TotalConsumptionTodayType } from "@/types/recipes";
import { numberNormalize } from "@/utils/common.functions";
import { macroStatStyle, mainBoxStyle } from "./TotalCalories.styles";

interface TotalCaloriesProps extends TotalConsumptionTodayType {}

export default function TotalCalories({ calories, protein, fat }: TotalCaloriesProps) {
  return (
    <Box sx={{ height: "100%" }}>
      <DashboardCard
        title={"Today's log"}
        titleDividerColor={"white"}
        childBorderColor={"text.primary"}
        titleBgColor={"secondary.main"}
        titleBorder={"secondary.main"}
        titleColor={"white"}
      >
        <Box sx={mainBoxStyle}>
          <MacroStat
            label="Calories"
            value={`${numberNormalize(Number(calories))} kCal`}
            icon={<LocalFireDepartmentIcon />}
          />
          <Divider orientation="vertical" flexItem />
          <MacroStat
            label="Fat"
            value={`${numberNormalize(Number(fat))} g`}
            icon={<OpacityIcon />}
          />
          <Divider orientation="vertical" flexItem />
          <MacroStat
            label="Protein"
            value={`${numberNormalize(Number(protein))} g`}
            icon={<EggIcon />}
          />
        </Box>
      </DashboardCard>
    </Box>
  );
}

type MacroStatProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

function MacroStat({ label, value, icon }: MacroStatProps) {
  return (
    <Box sx={macroStatStyle}>
      {icon}
      <Typography component={"h4"} fontWeight={"bold"}>
        {label}
      </Typography>
      <Typography fontWeight="medium">{value}</Typography>
    </Box>
  );
}