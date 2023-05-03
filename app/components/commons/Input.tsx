import React from "react";
import { InputText, InputTextProps } from "primereact/inputtext";
import styled from "styled-components";

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
    <InputWrapper>
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
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 1rem;
`;
