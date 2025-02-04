import { Handlers } from "$fresh/server.ts";
import { getXataClient } from '../../src/xata.ts';
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export const handler: Handlers = {
  async POST(req) {
    const xataClient = getXataClient();
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    if (!email || !password) {
      return new Response("Missing required fields", { status: 400 });
    }

    try {
      // Find user by email
      const user = await xataClient.db.Users
        .filter({ email })
        .getFirst();

      if (!user) {
        return new Response("Invalid email or password", { status: 401 });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password as string, user.password_hash as string);
      if (!isValidPassword) {
        return new Response("Invalid email or password", { status: 401 });
      }

      // Login successful
      const headers = new Headers();
      headers.append("Set-Cookie", `user_id=${user.id}; HttpOnly; Path=/`);
      return new Response("OK", { headers });
    } catch (error) {
      console.error("Login error:", error);
      return new Response("Login failed", { status: 500 });
    }
  },
};