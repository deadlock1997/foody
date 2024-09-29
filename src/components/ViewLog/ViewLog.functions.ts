import { FoodLogEntry } from "@/db/foodlog";

export const getAllLogs = async () => {
  try {
    const response = await fetch("/api/food-log/view-all");
    const data = (await response.json()) as FoodLogEntry[];
    return data;
  } catch (error) {
    console.error("Error fetching all logs:", error);
    return [];
  }
};
