import { FoodLogEntry } from "@/db/foodlog";

export const getTop5 = async () => {
  try {
    const response = await fetch("/api/food-log/top5");
    const data = (await response.json()) as FoodLogEntry[];
    return data;
  } catch (error) {
    console.error("Error fetching top 5:", error);
    return [];
  }
};
