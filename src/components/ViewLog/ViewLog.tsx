"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Typography,
  IconButton,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogFoodModal from "../LogFoodModal/LogFoodModal";
import { LoadedRecipe } from "@/types/logFood";
import LogFoodDeleteModal from "../LogFoodModal/LogFoodDeleteModal";
import Loader from "../Loader/Loader";
import { numberNormalize } from "@/utils/common.functions";
import { formControlStyles, tableStyles } from "./ViewLog.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchTotalConsumptionData } from "@/store/slice/DashboardSlice";

export default function ViewLog() {
  const [open, setOpen] = React.useState(false);
  const columnConfig = {
    recipeName: "Recipe Name",
    logDate: "Log Date",
    mealType: "Meal Type",
    calories: "Calories(kCal)",
    protein: "Protein(g)",
    fat: "Fat(g)",
    actions: "Actions",
  };
  const [openDelete, setOpenDelete] = React.useState(false);
  const [loadedRecipe, setLoadedRecipe] = React.useState<LoadedRecipe>();
  const [viewColumns, setViewColumns] = useState<string[]>([""]);
  const { totalConsumptionResponse, loading } = useSelector(
    (state: RootState) => state.dashboard
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTotalConsumptionData())
  }, [])
  

  if (loading) {
    return <Loader />;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setViewColumns((prev) =>
      checked ? [...prev, name] : prev.filter((column) => column !== name)
    );
  };

  return (
    <Box>
      <Box py={2}>
        <Typography variant="h5" color="primary.main" fontWeight={"bold"}>
          Your food log
        </Typography>
      </Box>
      <Box py={2}>
        <FormControl component="fieldset" sx={formControlStyles}>
          <FormLabel>Additional columns to view</FormLabel>
          <FormGroup row>
            {["mealType", "calories", "protein", "fat"].map((column) => (
              <FormControlLabel
                key={column}
                control={
                  <Checkbox
                    checked={viewColumns.includes(column)}
                    onChange={handleChange}
                    name={column}
                  />
                }
                label={column.charAt(0).toUpperCase() + column.slice(1)}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>
      <Table sx={tableStyles}>
        <TableHead>
          <TableRow>
            <TableCell>{columnConfig.recipeName}</TableCell>
            <TableCell>{columnConfig.logDate}</TableCell>
            {viewColumns.includes("mealType") && (
              <TableCell>{columnConfig.mealType}</TableCell>
            )}
            {viewColumns.includes("calories") && (
              <TableCell>{columnConfig.calories}</TableCell>
            )}
            {viewColumns.includes("protein") && (
              <TableCell>{columnConfig.protein}</TableCell>
            )}
            {viewColumns.includes("fat") && (
              <TableCell>{columnConfig.fat}</TableCell>
            )}
            <TableCell>{columnConfig.actions}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {totalConsumptionResponse.map((recipe) => (
            <TableRow key={recipe.recipeName}>
              <TableCell>{recipe.recipeName}</TableCell>
              <TableCell>
                {dayjs(recipe.logDate).format("DD MMM YYYY, hh:mm A")}
              </TableCell>
              {viewColumns.includes("mealType") && (
                <TableCell>{recipe.mealType}</TableCell>
              )}
              {viewColumns.includes("calories") && (
                <TableCell>
                  {numberNormalize(Number(recipe.calories))}
                </TableCell>
              )}
              {viewColumns.includes("protein") && (
                <TableCell>{numberNormalize(Number(recipe.protein))}</TableCell>
              )}
              {viewColumns.includes("fat") && (
                <TableCell>{numberNormalize(Number(recipe.fat))}</TableCell>
              )}
              <TableCell>
                <Box>
                  <IconButton
                    onClick={() => {
                      setOpen(true);
                      setLoadedRecipe(recipe);
                    }}
                  >
                    <EditIcon sx={{ color: "primary.main" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setOpenDelete(true);
                      setLoadedRecipe(recipe);
                    }}
                  >
                    <DeleteIcon sx={{ color: "primary.main" }} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <LogFoodModal
        open={open}
        handleClose={() => {
          setLoadedRecipe(undefined);
          setOpen(false);
        }}
        loadedRecipe={loadedRecipe}
      />
      {loadedRecipe && (
        <LogFoodDeleteModal
          open={openDelete}
          handleClose={() => {
            setLoadedRecipe(undefined);
            setOpenDelete(false);
          }}
          loadedRecipe={loadedRecipe}
        />
      )}
    </Box>
  );
}
