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
  rightIcon,
  onChange,
  ...otherProps
}: InputNumberProps & {
  label: string;
  width?: string;
  helper?: string;
  rightIcon?: React.ReactNode;
}) {
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

  const input = (
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
  );
  //#endregion

  //#region JSX
  return (
    <InputWrapper id={id} label={label}>
      {Boolean(rightIcon) ? (
        <span className="p-input-icon-right" style={{ width: "100%" }}>
          <i>{rightIcon}</i>
          {input}
        </span>
      ) : (
        <>{input}</>
      )}
      <InputHelper name={name} helper={helper} />
      <FormikFieldError error={errorMessage} />
    </InputWrapper>
  );
  //#endregion
}
