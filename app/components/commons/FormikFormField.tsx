import { useFormikContext } from "formik";
import { InputTextProps } from "primereact/inputtext";
import { Input } from "./Input";
import { InputPassword } from "./InputPassword";

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
  // @ts-ignore
  const className = errors[name] ? "p-invalid" : undefined;
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
      {...otherProps}
    />
  );
}
