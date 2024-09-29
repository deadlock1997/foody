import { logout } from "@/server-utils/session";
import { logInfo, logError } from "@/server-utils/logger";

export async function POST() {
  try {
    logInfo('Logout request received');
    await logout();
    logInfo('User successfully logged out');
    return new Response(JSON.stringify({ message: "Logged out" }), {
      status: 200,
    });
  } catch (error) {
    logError('Error during logout', error);
    return new Response(JSON.stringify({ message: "Error logging out" }), {
      status: 500,
    });
  }
}