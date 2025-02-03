import { Handlers } from "$fresh/server.ts";
import { getXataClient } from '../../src/xata.ts';
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export const handler: Handlers = {
  async POST(req) {
    const xataClient = getXataClient();
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    const first_name = form.get("first_name")?.toString();
    const last_name = form.get("last_name")?.toString();
    const phone_number = form.get("phone_number")?.toString();

    // Validate input
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      // Check if user exists
      const existingUser = await xataClient.db.Users
        .filter({ email })
        .getFirst();
      
      if (existingUser) {
        return new Response(JSON.stringify({ error: "User already exists" }), {
          status: 409,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password);

      // Create user in Xata
      await xataClient.db.Users.create({
        email,
        password_hash: passwordHash,
        first_name,
        last_name,
        phone_number,
      });

      return new Response(JSON.stringify({ toast: "Sign up successful! 🎉" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Registration error:", error);
      return new Response(JSON.stringify({ error: "Registration failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};