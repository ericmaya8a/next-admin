import { useFormikContext } from "formik";
import { Button, ButtonProps } from "primereact/button";

export function FormikSubmitButton(props: ButtonProps) {
  const { submitForm } = useFormikContext();

  return <Button {...props} onClick={submitForm} />;
}
