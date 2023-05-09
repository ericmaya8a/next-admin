import { InputText, InputTextProps } from "primereact/inputtext";
import { FormikFieldError } from "../Form/FormikFieldError";
import { InputWrapper } from "./InputWrapper";

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
    <InputWrapper id={id} label={label}>
      <InputText
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
      <FormikFieldError error={error} />
    </InputWrapper>
  );
}
