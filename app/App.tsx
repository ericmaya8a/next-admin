import React from "react";
import { Menu } from "./components/Menu";
import styles from "./App.module.css";

export function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Menu />
      <div className={styles.AppContainer}>{children}</div>
    </>
  );
}
