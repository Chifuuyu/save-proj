// routes/login.tsx
import { Handlers } from "$fresh/server.ts";
import { create } from "https://deno.land/x/djwt/mod.ts";

const SECRET_KEY = "your-secret-key";  // Your string secret key

// Modify the payload type to match djwt's expected format
type Payload = Record<string, any>;

async function createJwt(payload: Payload) {
  // Convert the string secret key to a CryptoKey
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET_KEY),  // Convert the string to bytes
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );

  // Create JWT with the CryptoKey
  const jwt = await create({ alg: "HS256", typ: "JWT" }, payload, cryptoKey);

  return jwt;
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const cookies = req.headers.get("cookie");
    console.log("Cookies in GET request:", cookies);

    if (cookies && cookies.includes("jwt=")) {
      // Redirect to home page if JWT cookie exists
      return Response.redirect(new URL("/", req.url));
    }

    // Render login page if no valid JWT cookie
    return await ctx.render();
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const username = form.get("username")?.toString();
    const password = form.get("password")?.toString();

    // Simulate successful login (replace with actual validation)
    if (username === "admin" && password === "password123") {
      // Create JWT payload
      const payload: Payload = { username };

      // Create JWT token
      const jwt = await createJwt(payload);

      // Set JWT cookie in the response headers
      const headers = new Headers();
      headers.set("Set-Cookie", `jwt=${jwt}; HttpOnly; SameSite=Strict; Path=/; Max-Age=3600`);

      // Create a new Response object with redirect and headers
      const redirectUrl = new URL("/", req.url);
      const response = new Response(null, { status: 303, headers });
      response.headers.set("Location", redirectUrl.toString());

      return response;
    }

    // If credentials are invalid
    return new Response("Invalid credentials", { status: 401 });
  },
};

export default function LoginPage() {
  return (
    <>
      <h1>Login</h1>
      <form method="post">
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
