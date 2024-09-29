import {
  Alert,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LogFoodForm from "./LogFoodForm";
import { RecipeDB } from "@/types/recipes";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import { Transition } from "@/utils/DialogTransition";
import {
  LogFoodError,
  LogFoodClientInput,
  LoadedRecipe,
} from "@/types/logFood";
import { SOMETHING_WENT_WRONG } from "@/contant";
import {
  dialogActionsStyle,
  dialogTitleStyle,
  dialogContentStyle,
  dialogPaperStyle,
} from "./LogFoodModal.styles";
import { emptyBoxFlex } from "./LogFoodDeleteModal.style";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  fetchRecentLogs,
  fetchTotalConsumptionData,
  fetchTotalConsumptionToday,
} from "@/store/slice/DashboardSlice";

interface LogFoodModalProps {
  open: boolean;
  handleClose: () => void;
  loadedRecipe?: LoadedRecipe;
}

export default function LogFoodModal({
  open,
  handleClose,
  loadedRecipe,
}: LogFoodModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [recipeId, setRecipeId] = useState(NaN);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const refreshData = () => {
    dispatch(fetchRecentLogs());
    dispatch(fetchTotalConsumptionData());
    dispatch(fetchTotalConsumptionToday());
  };
  const [logFoodInput, setLogFoodInput] = useState<LogFoodClientInput>({
    mealType: "",
    recipeName: "",
    calories: "",
    protein: "",
    fat: "",
    logDate: dayjs(),
  });
  const [logFoodError, setLogFoodError] = useState<LogFoodError>({
    mealType: "",
    recipeName: "",
    calories: "",
    protein: "",
    fat: "",
  });

  useEffect(() => {
    if (loadedRecipe) {
      setRecipeId(loadedRecipe.recipeId);
      setLogFoodInput({
        mealType: loadedRecipe.mealType,
        recipeName: loadedRecipe.recipeName,
        calories: loadedRecipe.calories,
        protein: loadedRecipe.protein,
        fat: loadedRecipe.fat,
        logDate: loadedRecipe.logDate,
      });
    }
  }, [loadedRecipe]);

  const handleFieldChange = <T extends keyof LogFoodClientInput>(
    value: LogFoodClientInput[T],
    name: T
  ) => {
    setLogFoodInput((prev) => ({ ...prev, [name]: value }));
    setLogFoodError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleReset = () => {
    setLogFoodInput(
      loadedRecipe
        ? {
            mealType: loadedRecipe.mealType,
            recipeName: loadedRecipe.recipeName,
            calories: loadedRecipe.calories,
            protein: loadedRecipe.protein,
            fat: loadedRecipe.fat,
            logDate: loadedRecipe.logDate,
          }
        : {
            mealType: "",
            recipeName: "",
            calories: "",
            protein: "",
            fat: "",
            logDate: dayjs(),
          }
    );
    setLogFoodError({
      mealType: "",
      recipeName: "",
      calories: "",
      protein: "",
      fat: "",
    });
    setRecipeId(NaN);
    setError(false);
  };

  const prefillRecipe = (recipe: RecipeDB) => {
    setLogFoodInput({
      ...logFoodInput,
      recipeName: recipe.title,
      calories: recipe.calories,
      protein: recipe.protein,
      fat: recipe.fat,
    });
  };

  const validateForm = () => {
    const { mealType, recipeName, logDate } = logFoodInput;
    const errors: LogFoodError = {};
    let valid = true;

    if (!mealType) {
      valid = false;
      errors.mealType = "Meal type is required";
    }
    if (!recipeName.trim()) {
      valid = false;
      errors.recipeName = "Recipe name is required";
    }
    if (!logDate) {
      valid = false;
      errors.logDate = "Log date is required";
    }
    if (dayjs(logDate).isAfter()) {
      valid = false;
      errors.logDate = "Log date cannot be in the future";
    }

    setLogFoodError(errors);
    return valid;
  };

  const handleSubmit = async () => {
    try {
      setInProgress(true);
      if (!validateForm()) return;

      const response = await fetch(
        `/api/food-log/${loadedRecipe ? "update" : "add"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...logFoodInput,
            recipeId,
            ...(loadedRecipe ? { id: loadedRecipe.id } : {}),
          }),
        }
      );

      if (!response.ok) {
        setError(true);
        return;
      }

      setSuccess(true);
      refreshData();
      handleReset();
      setRecipeId(NaN);

      if (loadedRecipe) handleClose();
    } catch {
      setError(true);
    } finally {
      setInProgress(false);
    }
  };

  const onCancelClick = () => {
    setSuccess(false);
    handleReset();
    handleClose();
  };

  return (
    <Dialog TransitionComponent={Transition} open={open} sx={dialogPaperStyle}>
      <DialogTitle sx={dialogTitleStyle}>Log Food</DialogTitle>
      <DialogContent sx={dialogContentStyle}>
        <Collapse in={!success}>
          <LogFoodForm
            setRecipeId={setRecipeId}
            prefillRecipe={prefillRecipe}
            logInfo={logFoodInput}
            logInfoError={logFoodError}
            handleChange={handleFieldChange}
          />
          <Collapse in={Boolean(error)}>
            <Alert
              sx={{ width: "100%" }}
              onClose={() => setError(false)}
              severity="error"
            >
              {SOMETHING_WENT_WRONG}
            </Alert>
          </Collapse>
        </Collapse>
        <Collapse in={success}>
          <Alert sx={{ width: "100%" }} severity="success">
            Food logged successfully!
          </Alert>
        </Collapse>
      </DialogContent>
      <DialogActions sx={dialogActionsStyle}>
        {!success ? (
          <>
            <Button variant="outlined" onClick={onCancelClick}>
              Close
            </Button>
            <Box sx={emptyBoxFlex} />
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
            <LoadingButton
              loading={inProgress}
              variant="contained"
              onClick={handleSubmit}
            >
              {loadedRecipe ? "Update" : "Submit"}
            </LoadingButton>
          </>
        ) : (
          <>
            <Button variant="outlined" onClick={onCancelClick}>
              Close
            </Button>
            <Box sx={emptyBoxFlex} />
            <Button
              variant="contained"
              onClick={() => {
                setSuccess(false);
              }}
            >
              Log More
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
