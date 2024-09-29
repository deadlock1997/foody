"use client";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import RecentLog from "../RecentLog/RecentLog";
import Greet from "../Greet/Greet";
import RecipeOfTheDay from "../RecipeOfTheDay/RecipeOfTheDay";
import TotalCalories from "../TotolCalories/TotalCalories";
import Graph from "../Graph/Graph";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
  exploreButtonStyle,
  exploreTitleStyle,
  mainBox,
} from "./Dashboard.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchDashboardData } from "@/store/slice/DashboardSlice";
import Loading from "@/app/loading";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);

  const {
    topPickRecipe,
    recentLogResponse,
    totalConsumptionTodayResponse,
    loading,
  } = useSelector((state: RootState) => state.dashboard);

  if (loading) {
    return <Loading />;
  }
  return (
    <Box sx={mainBox}>
      <Box className="welcome">
        <Greet />
      </Box>
      <Box className="totalCalories">
        {totalConsumptionTodayResponse && (
          <TotalCalories {...totalConsumptionTodayResponse} />
        )}
      </Box>
      <Box className="recipeOfTheDay">
        {topPickRecipe && <RecipeOfTheDay recipe={topPickRecipe} />}
      </Box>
      <Button className="exploreRecipes" href="/recipe" sx={exploreButtonStyle}>
        <Typography variant="h5" sx={exploreTitleStyle}>
          Explore Recipes
          <ArrowOutwardIcon sx={{ fontSize: 20, ml: 1 }} />
        </Typography>
      </Button>
      <Box className="recentLog">
        <RecentLog top5Recipes={recentLogResponse} />
      </Box>
      <Box className="graph" sx={{ border: "1px solid", minHeight: "400px" }}>
        <Graph />
      </Box>
    </Box>
  );
}
