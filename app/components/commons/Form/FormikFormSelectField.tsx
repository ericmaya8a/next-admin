import { useFormikContext } from "formik";
import {
  Dropdown,
  DropdownChangeEvent,
  DropdownProps,
} from "primereact/dropdown";
import { InputWrapper } from "../Input/InputWrapper";
import { InputHelper } from "../Input/InputHelper";
import { FormikFieldError } from "./FormikFieldError";

export function FormikFormSelectField({
  id,
  name = "",
  label,
  options,
  helper,
  onChange,
  ...otherProps
}: DropdownProps & { label: string; helper?: string }) {
  const {
    errors,
    touched,
    values,
    setFieldTouched,
    setFieldValue,
    validateField,
  } = useFormikContext();

  const handleChange = (e: DropdownChangeEvent) => {
    setFieldValue(name, e.value);
    validateField(name);
  };

  const handleBlur = () => {
    setFieldTouched(name);
    validateField(name);
  };

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

  return (
    <InputWrapper id={id} label={label}>
      <Dropdown
        className={className}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        options={options}
        optionLabel="label"
        placeholder="Select a Gender"
        aria-describedby={helper ? `${name}-help` : undefined}
        style={style}
      />
      <InputHelper name={name} helper={helper} />
      <FormikFieldError error={errorMessage} />
    </InputWrapper>
  );
}
