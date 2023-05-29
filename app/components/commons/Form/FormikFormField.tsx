import { useFormikContext } from "formik";
import { InputTextProps } from "primereact/inputtext";
import styled from "styled-components";
import { Input } from "../Input/Input";
import { InputPassword } from "../Input/InputPassword";

export function FormikFormField({
  id,
  name = "",
  type,
  label,
  helper,
  rightIcon,
  leftIcon,
  onChange,
  ...otherProps
}: InputTextProps & {
  label: string;
  helper?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
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
  const className = error ? "p-invalid" : undefined;
  const style = otherProps.width
    ? { ...otherProps.style, width: otherProps.width }
    : { ...otherProps.style };
  const errorMessage = hasError ? error : undefined;
  const hasIcon = Boolean(leftIcon) || Boolean(rightIcon);

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
  //#endregion

  //#region JSX
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
    <>
      {hasIcon ? (
        <span
          className={`p-input-icon-${Boolean(rightIcon) ? "right" : "left"}`}
          style={{ width: "100%" }}
        >
          <i>{Boolean(rightIcon) ? rightIcon : leftIcon}</i>
          <StyledInput
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
            hasIcon={hasIcon}
            {...otherProps}
          />
        </span>
      ) : (
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
      )}
    </>
  );
  //#endregion
}

//#region STYLES
const StyledInput = styled(Input)<{ hasIcon?: boolean }>`
  ${({ hasIcon }) => (hasIcon ? "padding-left: 2.5rem" : "")}
`;
//#endregion
