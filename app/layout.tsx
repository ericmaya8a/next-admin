"use client";

import { StyledComponentsRegistry } from "@/lib/registry";
import { App } from "./App";
import { Providers } from "./components/commons/Providers";
import "normalize.css";
import "primereact/resources/themes/viva-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <StyledComponentsRegistry>
            <App>{children}</App>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
