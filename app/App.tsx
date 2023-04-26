import React from "react";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import styles from "./App.module.css";

export function App({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Layout.Header className={styles.header}>
        <Navbar />
      </Layout.Header>
      <Layout.Content className={styles.content}>{children}</Layout.Content>
      <Layout.Footer className={styles.footer}>
        Ant Design ©2023 Created by Ant UED
      </Layout.Footer>
    </Layout>
  );
}
