import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid2,
  List,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useMemo } from "react";
import { useDebounce } from "use-debounce";
import { GetAllRecipesType, RecipeDB } from "@/types/recipes";
import { formatTextToNumber } from "@/utils/common.functions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { logFoodFormList, gridContainer, formControlError } from "./LogFoodForm.styles";
import { LogFoodClientInput, LogFoodError } from "@/types/logFood";

interface LogFoodFormProps {
  logInfo: LogFoodClientInput;
  logInfoError: LogFoodError;
  handleChange: <T extends keyof LogFoodClientInput>(
    value: LogFoodClientInput[T],
    name: T
  ) => void;
  prefillRecipe: (recipe: RecipeDB) => void;
  setRecipeId: React.Dispatch<React.SetStateAction<number>>;
}

export default function LogFoodForm(props: LogFoodFormProps) {
  const { logInfo, logInfoError, handleChange, prefillRecipe, setRecipeId } = props;
  const [recipeOptions, setRecipeOptions] = React.useState<RecipeDB[]>([]);
  const [debouncedValue] = useDebounce(logInfo.recipeName, 500);

  const fetchRecipesByName = async (value: string) => {
    const response = await fetch("/api/recipes/getRecipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm: value, page: 1, limit: 10 }),
    });
    if (response.ok) {
      const data = (await response.json()) as GetAllRecipesType;
      setRecipeOptions(data.recipes);
    }
  };

  const recipeId = useMemo(() => {
    return (
      recipeOptions.find((recipe) => recipe.title === logInfo.recipeName)?.id || NaN
    );
  }, [recipeOptions, logInfo.recipeName]);

  React.useEffect(() => {
    setRecipeId(recipeId);
  }, [recipeId]);

  React.useEffect(() => {
    if (debouncedValue) {
      fetchRecipesByName(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <List sx={logFoodFormList}>
      <ListItem>
        <FormControl error={!!logInfoError.mealType}>
          <FormLabel id="meal-type-label" required>
            Type of meal
          </FormLabel>
          <RadioGroup
            aria-labelledby="meal-type-label"
            name="meal-type-group"
            value={logInfo.mealType}
            onChange={(e) => handleChange(e.target.value, "mealType")}
            row
          >
            <FormControlLabel value="Breakfast" control={<Radio />} label="Breakfast" />
            <FormControlLabel value="Lunch" control={<Radio />} label="Lunch" />
            <FormControlLabel value="Snacks" control={<Radio />} label="Snacks" />
            <FormControlLabel value="Dinner" control={<Radio />} label="Dinner" />
          </RadioGroup>
          {!!logInfoError.mealType && (
            <FormHelperText sx={formControlError}>
              {logInfoError.mealType}
            </FormHelperText>
          )}
        </FormControl>
      </ListItem>

      <ListItem>
        <Autocomplete
          freeSolo
          fullWidth
          options={recipeOptions.map((option) => option.title)}
          value={logInfo.recipeName}
          onChange={(_, newValue) => {
            handleChange(newValue || "", "recipeName");
            if (newValue) {
              const recipe = recipeOptions.find((recipe) => recipe.title === newValue);
              if (recipe) prefillRecipe(recipe);
            }
          }}
          onInputChange={(event, newInputValue) => {
            handleChange(newInputValue, "recipeName");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="Recipe Name"
              error={!!logInfoError.recipeName}
              helperText={logInfoError.recipeName}
            />
          )}
        />
      </ListItem>

      <ListItem>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="When did you eat it?"
            disableFuture
            slotProps={{
              textField: {
                required: true,
                fullWidth: true,
                error: !!logInfoError.logDate,
                helperText: logInfoError.logDate,
              },
            }}
            value={dayjs(logInfo.logDate)}
            onChange={(newValue) => handleChange(newValue, "logDate")}
          />
        </LocalizationProvider>
      </ListItem>

      <ListItem>
        <Grid2 container spacing={2} sx={gridContainer}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <TextField
              label="Calories (kCal)"
              error={!!logInfoError.calories}
              helperText={logInfoError.calories}
              value={logInfo.calories}
              onChange={(event) => {
                handleChange(formatTextToNumber(event.target.value), "calories");
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <TextField
              label="Protein (g)"
              error={!!logInfoError.protein}
              helperText={logInfoError.protein}
              value={logInfo.protein}
              onChange={(event) => {
                handleChange(formatTextToNumber(event.target.value), "protein");
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <TextField
              label="Fat (g)"
              error={!!logInfoError.fat}
              helperText={logInfoError.fat}
              value={logInfo.fat}
              onChange={(event) => {
                handleChange(formatTextToNumber(event.target.value), "fat");
              }}
            />
          </Grid2>
        </Grid2>
      </ListItem>
    </List>
  );
}