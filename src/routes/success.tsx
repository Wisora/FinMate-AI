import { createFileRoute } from "@tanstack/react-router";
import Success from "~/pages/Success";
export const Route = createFileRoute("/success")({
  component: Success,
});
