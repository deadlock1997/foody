import { FoodLogDB } from "../../../../db/foodlog";
import { verifySession } from "@/server-utils/DAL/session";
import { logInfo, logError } from "@/server-utils/logger";
import { UpdateFoodLogPayload } from "@/types/logFood";

export async function POST(req: Request) {
  try {
    const { userId } = await verifySession();
    
    logInfo("Food log update attempt", { userId });

    const { ...rest } = (await req.json()) as UpdateFoodLogPayload;

    FoodLogDB.foodlog[userId].update(rest.id, rest);

    logInfo("Food log updated successfully", { userId, logId: rest.id });

    return new Response(JSON.stringify({ message: "Food log updated" }));
  } catch (error) {
    logError("Error updating food log", error);

    return new Response(JSON.stringify({ message: "Error updating food log" }), {
      status: 500,
    });
  }
}