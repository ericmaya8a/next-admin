import { useFormikContext } from "formik";
import { Button, ButtonProps } from "primereact/button";

export function FormikSubmitButton(props: ButtonProps) {
  //#region HOOKS
  const { submitForm } = useFormikContext();
  //#endregion

  //#region JSX
  return <Button {...props} onClick={submitForm} />;
  //#endregion
}
