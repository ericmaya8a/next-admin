import { useFormikContext } from "formik";
import { InputTextProps } from "primereact/inputtext";
import { Input } from "../Input/Input";
import { InputPassword } from "../Input/InputPassword";

export function FormikFormField({
  id,
  name = "",
  type,
  label,
  helper,
  onChange,
  ...otherProps
}: InputTextProps & { label: string; helper?: string }) {
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
  const className = error ? "p-invalid" : undefined;
  const style = otherProps.width
    ? { ...otherProps.style, width: otherProps.width }
    : { ...otherProps.style };
  const errorMessage = hasError ? error : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = () => {
    setFieldTouched(name);
    validateField(name);
  };

  if (type === "password") {
    return (
      <InputPassword
        className={className}
        label={label}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errorMessage}
        style={style}
        feedback={false}
        {...otherProps}
      />
    );
  }

  return (
    <Input
      className={className}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errorMessage}
      style={style}
      helper={helper}
      {...otherProps}
    />
  );
}