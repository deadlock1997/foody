import { getRecipesData } from "@/server-utils/DAL/recipe";
import { logInfo, logError } from "@/server-utils/logger";
import { RecipeDB } from "@/types/recipes";

export const GET = async (
  request: Request,
  { params }: { params: { recipeId: string } }
) => {
  try {
    const { recipeId } = params;
    logInfo("GET /api/recipes/[recipeId] - Received request", { recipeId });

    const data = await getRecipesData();
    logInfo("GET /api/recipes/[recipeId] - Fetched data from getRecipesData", { data });

    let resultRecipe: RecipeDB | undefined;
    try {
      resultRecipe = data.find((recipe) => recipe.id === Number(recipeId));
      if (resultRecipe) {
        logInfo("GET /api/recipes/[recipeId] - Recipe found", { resultRecipe });
      } else {
        logInfo("GET /api/recipes/[recipeId] - Recipe not found", { recipeId });
      }
    } catch (err) {
      logError("GET /api/recipes/[recipeId] - Error finding recipe by ID", { error: err });
    }

    if (resultRecipe) {
      return new Response(JSON.stringify(resultRecipe), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ message: `Recipe with ID ${recipeId} not found` }),
        { status: 404 }
      );
    }
  } catch (err) {
    logError("GET /api/recipes/[recipeId] - Error in request", { error: err });
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};