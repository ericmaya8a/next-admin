import { useFormikContext } from "formik";
import { InputTextProps } from "primereact/inputtext";
import { Input } from "./Input";

export function FormikFormField({
  id,
  name = "",
  type,
  label,
  onChange,
  ...otherProps
}: InputTextProps & { label: string }) {
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

  return (
    <Input
      // @ts-ignore
      className={errors[name] ? "p-invalid" : undefined}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={({ target: { value } }) => setFieldValue(name, value)}
      onBlur={() => {
        setFieldTouched(name);
        validateField(name);
      }}
      error={hasError ? error : undefined}
      style={
        otherProps.width
          ? { ...otherProps.style, width: otherProps.width }
          : { ...otherProps.style }
      }
      {...otherProps}
    />
  );
}
