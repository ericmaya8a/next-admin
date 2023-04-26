"use client";
import { App } from "./App";
import { Providers } from "./components/commons/Providers";
import "antd/dist/reset.css";
// import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <App>{children}</App>
        </Providers>
      </body>
    </html>
  );
}
