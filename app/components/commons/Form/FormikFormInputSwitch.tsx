import { useFormikContext } from "formik";
import {
  InputSwitch,
  InputSwitchChangeEvent,
  InputSwitchProps,
} from "primereact/inputswitch";
import { InputWrapper } from "../Input/InputWrapper";
import { InputHelper } from "../Input/InputHelper";
import { FormikFieldError } from "./FormikFieldError";

export function FormikFormInputSwitch({
  id,
  name = "",
  label,
  helper,
  onChange,
  ...otherProps
}: Omit<InputSwitchProps, "checked"> & { label: string; helper?: string }) {
  //#region HOOKS
  const {
    errors,
    touched,
    values,
    setFieldTouched,
    setFieldValue,
    validateField,
  } = useFormikContext();
  //#endregion

  //#region LOGIC
  // @ts-ignore
  const value = values[name];
  // @ts-ignore
  const error = errors[name];
  // @ts-ignore
  const hasError: boolean = touched[name] && error;
  // @ts-ignore
  const className = error ? "p-invalid" : undefined;
  const style = { ...otherProps.style, width: otherProps.width ?? "50px" };
  const errorMessage = hasError ? error : undefined;

  const handleChange = (e: InputSwitchChangeEvent) => {
    setFieldValue(name, e.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = () => {
    setFieldTouched(name);
    validateField(name);
  };
  //#endregion

  //#region JSX
  return (
    <InputWrapper id={id} label={label}>
      <InputSwitch
        className={className}
        id={id}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        style={style}
        aria-describedby={helper ? `${name}-help` : undefined}
        checked={value}
        value={value}
        {...otherProps}
      />
      <InputHelper name={name} helper={helper} />
      <FormikFieldError error={errorMessage} />
    </InputWrapper>
  );
  //#endregion
}
