import { createFileRoute } from "@tanstack/react-router";
import { handlePayfastNotify } from "~/services/payfastWebhook.js";

/**
 * PayFast Instant Transaction Notification (ITN) webhook.
 *
 * This is a server-only route: it bypasses the React render pipeline and returns a
 * plain "OK" body to PayFast. The frontend already points `notify_url` at
 * `${origin}/api/payfast-notify`, so no frontend change is needed to reach this.
 *
 * Served through the same single Vercel render function as the rest of the app
 * (no separate function) — the TanStack Start server handler dispatches it here.
 */
export const Route = createFileRoute("/api/payfast-notify")({
  server: {
    handlers: {
      POST: async ({ request }) => handlePayfastNotify(request),
    },
  },
});
