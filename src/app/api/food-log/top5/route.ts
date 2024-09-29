import { FoodLogDB } from "../../../../db/foodlog";
import { verifySession } from "@/server-utils/DAL/session";
import { logInfo, logError } from "@/server-utils/logger";

export async function GET() {
  try {
    const { userId } = await verifySession();
    if (!userId) throw new Error("User session verification failed");

    logInfo("Fetching top 5 food logs", { userId });

    if (!FoodLogDB.foodlog[userId]) {
      logInfo("No food logs found for user", { userId });
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const top5 = FoodLogDB.foodlog[userId].top5();

    logInfo("Top 5 food logs fetched successfully", { userId, top5 });

    return new Response(JSON.stringify(top5), {
      status: 200,
    });
  } catch (error) {
    logError("Error fetching top 5 food logs", error);
    return new Response(JSON.stringify([]), {
      status: 500,
    });
  }
}