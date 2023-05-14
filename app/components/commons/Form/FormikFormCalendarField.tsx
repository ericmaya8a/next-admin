import { useFormikContext } from "formik";
import {
  Calendar,
  CalendarChangeEvent,
  CalendarProps,
} from "primereact/calendar";
import { CONSTANTS } from "@/app/constatnts";
import { InputWrapper } from "../Input/InputWrapper";
import { InputHelper } from "../Input/InputHelper";
import { FormikFieldError } from "./FormikFieldError";

export function FormikFormCalendarField({
  id,
  name = "",
  label,
  helper,
  onChange,
  ...otherProps
}: CalendarProps & { label: string; width?: string; helper?: string }) {
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

  const handleChange = (e: CalendarChangeEvent) => {
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
      <Calendar
        className={className}
        id={id}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        dateFormat={CONSTANTS.date.calendarFormat}
        showIcon
        style={style}
        aria-describedby={helper ? `${name}-help` : undefined}
        showButtonBar
        {...otherProps}
      />
      <InputHelper name={name} helper={helper} />
      <FormikFieldError error={errorMessage} />
    </InputWrapper>
  );
}
