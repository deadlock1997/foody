import { FoodLogDB } from "../../../../db/foodlog";
import { verifySession } from "@/server-utils/DAL/session";
import { logInfo, logError } from "@/server-utils/logger";

export async function GET() {
  try {
    const { userId } = await verifySession();
    if (!userId) throw new Error("User session verification failed");

    logInfo("Fetching today's total consumption", { userId });

    if (!FoodLogDB.foodlog[userId]) {
      logInfo("No food logs found for user", { userId });
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const totalConsumption =
      FoodLogDB.foodlog[userId].getTodaysTotalConsumption();

    logInfo("Total consumption fetched successfully", { userId, totalConsumption });

    return new Response(JSON.stringify(totalConsumption), {
      status: 200,
    });
  } catch (error) {
    logError("Error fetching total consumption", error);
    return new Response(JSON.stringify([]), {
      status: 500,
    });
  }
}