import { serve } from "bun";
import index from "@/index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,
  },

  // TODO(@bun): remove the override when oven‑sh/bun#18258 is resolved
  development: false,
});

console.log(`🚀 Server running at ${server.url}`);