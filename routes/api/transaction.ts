import { Handlers } from "$fresh/server.ts";
import { getXataClient } from '../../src/xata.ts';

export const handler: Handlers = {
    async GET(req) {
      const cookies = req.headers.get("cookie");
      const xataClient = getXataClient();
      console.log("Cookies received:", cookies); // Debugging log
  
      const userId = cookies?.match(/user_id=([^;]+)/)?.[1];
      console.log("Extracted userId:", userId);
  
      if (!userId) {
        return new Response("Unauthorized", { status: 401 });
      }
  
      try {
        const records = await xataClient.db.Transactions.filter( { "user.id": userId} ).getAll();
        return new Response(JSON.stringify(records), {
        headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Database error:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    },
  };
  