import { createSession } from "@/server-utils/session";
import { UserDB } from "../../../../db/users";
import { logInfo, logError, logWarn } from "@/server-utils/logger";

export async function POST(req: Request) {
  try {
    logInfo("Login request received");

    const { email, password } = JSON.parse(await req.text());
    logInfo("Login attempt", { email });

    const userFound = UserDB.users.find(
      (user) =>
        user.email.toLocaleLowerCase() === email.toLocaleLowerCase() &&
        user.password === password
    );

    if (!userFound) {
      logWarn("Invalid email or password", { email });
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    const user = {
      email: userFound.email,
      name: userFound.name,
      id: userFound.id,
    };

    await createSession(user.name, user.id, userFound.email);
    logInfo("User logged in successfully", { userName: user.name, id: user.id });

    return new Response(JSON.stringify({ userName: user.name, id: user.id }), {
      status: 200,
    });
  } catch (error) {
    logError("Error during login process", error);
    return new Response(JSON.stringify({ message: "Error logging in" }), {
      status: 500,
    });
  }
}