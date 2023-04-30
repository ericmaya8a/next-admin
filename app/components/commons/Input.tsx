import React from "react";
import { InputText, InputTextProps } from "primereact/inputtext";
import styles from "./Input.module.css";

export function Input({
  id,
  name,
  type,
  value,
  label,
  error,
  onChange,
  ...otherProps
}: InputTextProps & { label: string; error?: string }) {
  return (
    <div className={styles.Input}>
      <label htmlFor={id}>{label}</label>
      <InputText
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
      {error ? <small className="p-error">{error}</small> : null}
    </div>
  );
}
