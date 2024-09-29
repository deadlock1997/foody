import { FoodLogDB } from "../../../../db/foodlog";
import { v4 as uuidv4 } from "uuid";
import { SortedLinkedList } from "@/server-utils/FoodLogLinkedList";
import { logInfo, logError } from "@/server-utils/logger";
import { AddFoodLogPayload } from "@/types/logFood";
import { verifySession } from "@/server-utils/DAL/session";

export async function POST(req: Request) {
  try {
    const foodLogInput = (await req.json()) as AddFoodLogPayload;

    const { userId } = await verifySession();

    logInfo("Food log addition attempt", { userId });

    if (FoodLogDB.foodlog[userId]) {
      FoodLogDB.foodlog[userId].insert({ ...foodLogInput, id: uuidv4() });
    } else {
      FoodLogDB.foodlog[userId] = new SortedLinkedList();
      FoodLogDB.foodlog[userId].insert({ ...foodLogInput, id: uuidv4() });
    }

    logInfo("Food log added successfully", { userId });

    return new Response(JSON.stringify({ message: "Food log added" }));
  } catch (error) {
    logError("Error adding food log", error);
    return new Response(JSON.stringify({ message: "Error adding food log" }), {
      status: 500,
    });
  }
}