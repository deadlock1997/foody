
export type RecipeDB = {
  id: number;
  directions: string[];
  fat: number;
  date: string; // ISO 8601 date string
  categories: string[];
  calories: number;
  desc: string | null;
  protein: number;
  rating: number;
  title: string;
  ingredients: string[];
  sodium: number;
};

export type TotalConsumptionTodayType = {
  calories: number;
  protein: number;
  fat: number
}

export type GetAllRecipesType = {
  recipes: RecipeDB[];
  page: number;
  limit: number;
  totalRecipes: number;
  totalPages: number;
};