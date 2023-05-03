import React from "react";
import { Menu } from "./components/Menu";

export function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Menu />
      <div style={{ padding: "0 1rem" }}>{children}</div>
    </>
  );
}
