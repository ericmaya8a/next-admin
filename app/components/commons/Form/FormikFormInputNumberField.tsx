import { useFormikContext } from "formik";
import {
  InputNumber,
  InputNumberChangeEvent,
  InputNumberProps,
} from "primereact/inputnumber";
import { InputWrapper } from "../Input/InputWrapper";
import { InputHelper } from "../Input/InputHelper";
import { FormikFieldError } from "./FormikFieldError";

export function FormikFormInputNumberField({
  id,
  name = "",
  type,
  label,
  helper,
  onChange,
  ...otherProps
}: InputNumberProps & { label: string; width?: string; helper?: string }) {
  const {
    errors,
    touched,
    values,
    setFieldTouched,
    setFieldValue,
    validateField,
  } = useFormikContext();
  // @ts-ignore
  const value = values[name];
  // @ts-ignore
  const error = errors[name];
  // @ts-ignore
  const hasError: boolean = touched[name] && error;
  // @ts-ignore
  const className = errors[name] ? "p-invalid" : undefined;
  const style = otherProps.width
    ? { ...otherProps.style, width: otherProps.width }
    : { ...otherProps.style };
  const errorMessage = hasError ? error : undefined;

  const handleChange = (e: InputNumberChangeEvent) => {
    setFieldValue(name, e.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = () => {
    setFieldTouched(name);
    validateField(name);
  };

  return (
    <InputWrapper id={id} label={label}>
      <InputNumber
        className={className}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={style}
        aria-describedby={helper ? `${name}-help` : undefined}
        {...otherProps}
      />
      <InputHelper name={name} helper={helper} />
      <FormikFieldError error={errorMessage} />
    </InputWrapper>
  );
}
