import { Password, PasswordProps } from "primereact/password";
import styled from "styled-components";
import { InputWrapper } from "./InputWrapper";
import { FormikFieldError } from "../Form/FormikFieldError";
import { InputHelper } from "./InputHelper";

export function InputPassword({
  id,
  name,
  value,
  label,
  error,
  header,
  helper,
  onChange,
  ...otherProps
}: PasswordProps & { label: string; helper?: string; error?: string }) {
  return (
    <InputWrapper id={id} label={label}>
      <StyledPassword
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        toggleMask
        aria-describedby={helper ? `${name}-help` : undefined}
        {...otherProps}
      />
      <InputHelper name={name!} helper={helper} />
      <FormikFieldError error={error} />
    </InputWrapper>
  );
}

const StyledPassword = styled(Password)`
  input {
    width: 100%;
  }
`;
