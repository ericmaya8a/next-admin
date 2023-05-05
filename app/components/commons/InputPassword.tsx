import { Password, PasswordProps } from "primereact/password";
import styled from "styled-components";
import { FormikFieldError } from "./FormikFieldError";
import { InputWrapper } from "./InputWrapper";

export function InputPassword({
  id,
  name,
  value,
  label,
  error,
  onChange,
  ...otherProps
}: PasswordProps & { label: string; error?: string }) {
  return (
    <InputWrapper id={id} label={label}>
      <StyledPassword
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        toggleMask
        {...otherProps}
      />
      <FormikFieldError error={error} />
    </InputWrapper>
  );
}

const StyledPassword = styled(Password)`
  input {
    width: 100%;
  }
`;
