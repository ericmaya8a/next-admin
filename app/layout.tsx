"use client";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import "antd/dist/reset.css";
import { Layout } from "antd";
import styles from "./layout.module.css";
// import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Layout>
            <Layout.Header className={styles.header}>
              <Navbar />
            </Layout.Header>
            <Layout.Content className={styles.content}>
              {children}
            </Layout.Content>
            <Layout.Footer className={styles.footer}>
              Ant Design ©2023 Created by Ant UED
            </Layout.Footer>
          </Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
