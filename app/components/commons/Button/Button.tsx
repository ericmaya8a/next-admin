import { ButtonProps, Button as AntButton } from "antd";
import styles from "./Button.module.css";

export function Button(props: ButtonProps) {
  return <AntButton className={styles.antButton} {...props} />;
}
