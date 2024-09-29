import { FoodLogDB } from "../../../../db/foodlog";
import { verifySession } from "@/server-utils/DAL/session";
import { logInfo, logError } from "@/server-utils/logger";

export async function GET() {
  try {
    const { userId } = await verifySession();
    if (!userId) throw new Error("User session verification failed");

    logInfo("Fetching all food logs", { userId });

    if (!FoodLogDB.foodlog[userId]) {
      logInfo("No food logs found for user", { userId });
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const allLogs = FoodLogDB.foodlog[userId].viewAll();

    logInfo("All food logs fetched successfully", {
      userId,
      totalLogs: allLogs.length,
    });

    return new Response(JSON.stringify(allLogs), {
      status: 200,
    });
  } catch (error) {
    logError("Error fetching all food logs", error);
    return new Response(JSON.stringify([]), {
      status: 500,
    });
  }
}
