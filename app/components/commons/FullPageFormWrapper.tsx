import React from "react";
import { Card } from "primereact/card";
import styles from "./FullPageFormWrapper.module.css";

type FullPageFormWrapperProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
};

export function FullPageFormWrapper({
  children,
  title,
}: FullPageFormWrapperProps) {
  return (
    <div className={styles.container}>
      <Card title={title} className={styles.card}>
        {children}
      </Card>
    </div>
  );
}
