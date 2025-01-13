import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req) {
    const headers = new Headers();
    // Remove the userLoggedIn cookie by setting an expired date
    headers.set(
      "Set-Cookie",
      "userLoggedIn=; HttpOnly; Secure; SameSite=Strict; Max-Age=0"
    );

    // Redirect to the login page after logout
    headers.set("location", "/login");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};
