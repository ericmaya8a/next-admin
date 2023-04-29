"use client";
import { App } from "./App";
import { Providers } from "./components/commons/Providers";
import { Menu } from "./components/Menu";
import "normalize.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
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
          <Menu />
          <div style={{ padding: "0 1rem" }}>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
