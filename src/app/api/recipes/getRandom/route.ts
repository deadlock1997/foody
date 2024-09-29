import { getRecipesData } from "@/server-utils/DAL/recipe";
import { RecipeDB } from "@/types/recipes";
import { logInfo, logError } from "@/server-utils/logger";

export const GET = async () => {
  try {
    const data = await getRecipesData();
    const recipeId = Math.floor(Math.random() * data.length) + 1;

    logInfo("Fetching random recipe", { recipeId });

    let resultRecipe: RecipeDB | undefined;
    try {
      resultRecipe = data.find((recipe) => recipe.id === Number(recipeId));
    } catch (err) {
      logError("Error finding recipe", err);
    }

    logInfo("Random recipe fetched successfully", { recipeId });

    return new Response(JSON.stringify(resultRecipe), {
      status: 200,
    });
  } catch (err) {
    logError("Error in GET /api/recipes/random", err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};