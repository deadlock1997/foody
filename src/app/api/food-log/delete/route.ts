import { FoodLogDB } from "../../../../db/foodlog";
import { logInfo, logError } from "@/server-utils/logger";
import { verifySession } from "@/server-utils/DAL/session";
import { DeleteFoodLogPayload } from "@/types/logFood";

export async function POST(req: Request) {
  try {
    const { userId } = await verifySession();
    logInfo("Food log deletion attempt", { userId });

    const { id } = (await req.json()) as DeleteFoodLogPayload;

    FoodLogDB.foodlog[userId].delete(id);

    logInfo("Food log deleted successfully", { userId, logId: id });

    return new Response(JSON.stringify({ message: "Food log deleted" }), {
      status: 200,
    });
  } catch (error) {
    logError("Error deleting food log", error);
    return new Response(JSON.stringify({ message: "Error deleting food log" }), {
      status: 500,
    });
  }
}