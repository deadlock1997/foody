import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { logInfo, logError } from "./logger";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);

    logInfo("Session encrypted successfully");
    return token;
  } catch (error) {
    logError("Error encrypting session", error);
    throw new Error("Failed to encrypt session");
  }
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    logInfo("Session decrypted successfully", { payload });
    return payload;
  } catch (error) {
    logError("Failed to verify session", error);
    return null;
  }
}

export async function createSession(
  userName: string,
  userId: string,
  email: string
) {
  try {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userName, expiresAt, userId, email });

    cookies().set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });

    logInfo("Session created successfully", { userName, userId, email });
  } catch (error) {
    logError("Error creating session", error);
    throw new Error("Failed to create session");
  }
}

export function deleteSession() {
  try {
    cookies().delete("session");
    logInfo("Session deleted successfully");
  } catch (error) {
    logError("Error deleting session", error);
  }
}

export async function logout() {
  try {
    deleteSession();
    logInfo("User logged out successfully");
  } catch (error) {
    logError("Error during logout", error);
  }
}