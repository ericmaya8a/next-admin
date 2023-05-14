import { InputText, InputTextProps } from "primereact/inputtext";
import { FormikFieldError } from "../Form/FormikFieldError";
import { InputWrapper } from "./InputWrapper";
import { InputHelper } from "./InputHelper";

export function Input({
  id,
  name,
  type,
  value,
  label,
  error,
  helper,
  onChange,
  ...otherProps
}: InputTextProps & { label: string; helper?: string; error?: string }) {
  return (
    <InputWrapper id={id} label={label}>
      <InputText
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-describedby={helper ? `${name}-help` : undefined}
        {...otherProps}
      />
      <InputHelper name={name!} helper={helper} />
      <FormikFieldError error={error} />
    </InputWrapper>
  );
}
