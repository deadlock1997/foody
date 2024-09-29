import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/server-utils/session";
import { redirect } from "next/navigation";
import { logInfo, logError } from "../logger";

const emptySession = {
  isAuth: false,
  userName: "",
  userId: "",
  email: "",
};
export const verifySession = async (): Promise<{
  isAuth: boolean;
  userName: string;
  userId: string;
  email: string;
}> => {
  try {
    const cookie = cookies().get("session")?.value;
    if (!cookie) {
      logError("No session cookie found");
      redirect("/");
      return emptySession;
    }

    const session = await decrypt(cookie);

    if (!session?.userName) {
      logError("Session is invalid or expired", { session });
      redirect("/");
      return emptySession;
    }

    logInfo("Session verified successfully", {
      userName: session.userName,
      userId: session.userId,
      email: session.email,
    });

    return {
      isAuth: true,
      userName: session.userName as string,
      userId: session.userId as string,
      email: session.email as string,
    };
  } catch (error) {
    logError("Error verifying session", error);
    return emptySession;
  }
};
