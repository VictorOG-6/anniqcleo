import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  userId: string;
  [key: string]: unknown;
}

/**
 * Securely store authentication token
 * Uses httpOnly cookies for web (most secure) or encrypted storage for mobile
 */
export const storeAuthToken = async (token: string): Promise<void> => {
  try {
    // For Next.js web app - use server action or API route to set httpOnly cookie
    await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
      credentials: "include", // Important for cookies
    });
  } catch (error) {
    console.error("Failed to store auth token:", error);
    throw new Error("Session storage failed");
  }
};

/**
 * Validate JWT token before storing
 */
export const validateToken = (token: string): DecodedToken => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp <= currentTime) {
      throw new Error("Token is expired");
    }

    return decoded;
  } catch (error) {
    console.error("Token validation failed:", error);
    throw new Error("Invalid token");
  }
};
