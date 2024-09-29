import { RecipeDB } from "@/types/recipes";
import { promises as fs } from "fs";
import path from "path";
import { logError, logInfo } from "../logger";

export const getRecipesData = async (): Promise<RecipeDB[]> => {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "db",
      "recipeData.json"
    );

    logInfo("Reading recipes data from file", { filePath });

    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent) as RecipeDB[];

    logInfo("Recipes data read successfully", { totalRecipes: data.length });

    return data;
  } catch (error) {
    logError("Error reading recipes data", error);
    throw new Error("Error reading recipes data");
  }
};