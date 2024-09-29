import { getRecipesData } from "@/server-utils/DAL/recipe";
import { NextRequest, NextResponse } from "next/server";
import { logInfo, logError } from "@/server-utils/logger";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    let page = parseInt(searchParams.get("page") || "1");
    let limit = parseInt(searchParams.get("limit") || "10");

    logInfo("Fetching paginated recipes", { page, limit });

    const recipes = await getRecipesData();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRecipes = recipes.slice(startIndex, endIndex);
    const totalPages = Math.ceil(recipes.length / limit);

    logInfo("Recipes fetched successfully", {
      page,
      limit,
      totalPages,
      totalRecipes: recipes.length,
    });

    return NextResponse.json({
      page,
      limit,
      totalPages,
      totalRecipes: recipes.length,
      recipes: paginatedRecipes,
    });
  } catch (error) {
    logError("Error fetching recipes", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};