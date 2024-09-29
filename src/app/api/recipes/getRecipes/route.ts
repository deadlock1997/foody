import { getRecipesData } from "@/server-utils/DAL/recipe";
import { RecipeDB } from "@/types/recipes";
import { logInfo, logError } from "@/server-utils/logger";

export async function POST(req: Request) {
  let data: RecipeDB[] = [];

  try {
    data = await getRecipesData();

    const { searchTerm, page = 1, limit = 10 } = JSON.parse(await req.text());

    logInfo("Searching for recipes", { searchTerm, page, limit });

    const resultRecipes = data.filter((recipe) =>
      recipe.title?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    logInfo("Recipes found", { totalResults: resultRecipes.length });

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRecipes = resultRecipes.slice(startIndex, endIndex);
    const totalPages = Math.ceil(resultRecipes.length / limit);

    return new Response(
      JSON.stringify({
        totalPages: totalPages,
        totalResults: resultRecipes.length,
        recipes: paginatedRecipes,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    logError("Error in POST /api/recipes/search", err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}