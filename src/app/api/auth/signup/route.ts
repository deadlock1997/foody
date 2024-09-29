import { UserDB } from "../../../../db/users";
import { v4 as uuidv4 } from "uuid";
import { logInfo, logError, logWarn } from "@/server-utils/logger";

export async function POST(res: Request) {
  try {
    const { email, password, name } = JSON.parse(await res.text());

    logInfo("User creation attempt", { email });

    if (UserDB.checkAlreadyExist(email)) {
      logWarn("Email already exists", { email });
      return new Response("Email already exists", { status: 400 });
    }

    UserDB.addUser({ email, password, name, id: uuidv4() });

    logInfo("User created successfully", { email, name });

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    logError("Error creating user", error);
    return new Response(JSON.stringify({ message: "Error creating user" }), {
      status: 500,
    });
  }
}