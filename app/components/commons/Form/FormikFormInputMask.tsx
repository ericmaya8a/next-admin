import { useFormikContext } from "formik";
import {
  InputMask,
  InputMaskChangeEvent,
  InputMaskProps,
} from "primereact/inputmask";
import { InputWrapper } from "../Input/InputWrapper";
import { InputHelper } from "../Input/InputHelper";
import { FormikFieldError } from "./FormikFieldError";

export function FormikFormInputMask({
  id,
  name = "",
  type,
  label,
  helper,
  onChange,
  ...otherProps
}: InputMaskProps & { label: string; helper?: string }) {
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
  const style = otherProps.width
    ? { ...otherProps.style, width: otherProps.width }
    : { ...otherProps.style };
  const errorMessage = hasError ? error : undefined;

  const handleChange = (e: InputMaskChangeEvent) => {
    setFieldValue(name, e.target.value);
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
      <InputMask
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
  //#endregion
}
