import { RecipeDB } from "@/types/recipes";
import { Box, Typography, Link } from "@mui/material";
import React from "react";
import DashboardCard from "../Common/DashboardCard/DashboardCard";
import { imageBoxStyle, titleBoxStyle, imageStyle } from "./RecipeOfTheDay.styles";

interface RecipeOfTheDayProps {
  recipe: RecipeDB;
}

export default function RecipeOfTheDay(props: RecipeOfTheDayProps) {
  const { recipe } = props;

  return (
    <DashboardCard
      title={"Top pick for you"}
      titleDividerColor={"text.primary"}
      childBorderColor={"text.primary"}
      titleBgColor={""}
      titleBorder={"text.primary"}
      titleColor={"text.primary"}
    >
      <Box sx={imageBoxStyle}>
        <img
          src={`/images/recipe/${recipe.id}.jpg`}
          style={imageStyle}
          alt="Recipe of the day"
        />
      </Box>
      <Box sx={titleBoxStyle}>
        <Typography component={"h3"} fontWeight={"bold"}>
          <Link href={`/recipe/${recipe.id}`}>{recipe.title}</Link>
        </Typography>
      </Box>
    </DashboardCard>
  );
}