import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { AppProviders } from "~/contexts/AppContext";
import { AppShell } from "~/components/layout/AppShell";
import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FinMate AI" },
      {
        name: "description",
        content:
          "FinMate AI — track savings, debt and investment goals; get weekly and monthly reports; ask your personal finance assistant anything.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: () => (
    <div className="page container">
      <div className="card placeholder-card">
        <h1 className="page-title">404</h1>
        <p className="page-sub">Page not found</p>
        <Link className="btn btn-primary" to="/">
          Home
        </Link>
      </div>
    </div>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <HeadContent />
      </head>
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
        <Scripts />
      </body>
    </html>
  );
}
