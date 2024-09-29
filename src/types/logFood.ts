import { FoodLogEntry } from "@/db/foodlog";
import dayjs from "dayjs";

export interface LoadedRecipe extends FoodLogEntry {
  recipeId: number;
}

export interface LogFoodClientInput {
  mealType: string | string;
  recipeName: string | string;
  calories: number | string;
  protein: number | string;
  fat: number | string;
  logDate: null | dayjs.Dayjs | string;
}

export interface LogFoodServerInput {
  recipeId: number;
  mealType: string | string;
  recipeName: string | string;
  calories: number | string;
  protein: number | string;
  fat: number | string;
  logDate: string;
}

export interface LogFoodError {
  mealType?: string;
  recipeName?: string;
  calories?: string;
  protein?: string;
  fat?: string;
  logDate?: string;
}

export interface AddFoodLogPayload extends LogFoodServerInput {
  userId: string;
}

export interface UpdateFoodLogPayload extends LogFoodServerInput {
  id: string;
}

export interface DeleteFoodLogPayload {
  id: string;
}