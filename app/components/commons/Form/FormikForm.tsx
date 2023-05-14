import { Form, Formik, FormikConfig, FormikValues } from "formik";

type ForkimFormProps<T> = {
  initialValues: FormikConfig<T>["initialValues"];
  validationSchema: FormikConfig<T>["validationSchema"];
  onSubmit: FormikConfig<T>["onSubmit"];
  children: React.ReactNode;
};

export function FormikForm<T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}: ForkimFormProps<T>) {
  return (
    <Formik<T>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      {() => <Form>{children}</Form>}
    </Formik>
  );
}
