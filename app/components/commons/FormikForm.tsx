import { Formik, FormikConfig, FormikValues } from "formik";

type ForkimFormProps<T> = {
  initialValues: FormikConfig<T>["initialValues"];
  validatiinSchema: FormikConfig<T>["validationSchema"];
  onSubmit: FormikConfig<T>["onSubmit"];
  children: React.ReactNode;
};

export function FormikForm<T extends FormikValues>({
  initialValues,
  validatiinSchema,
  onSubmit,
  children,
}: ForkimFormProps<T>) {
  return (
    <Formik<T>
      initialValues={initialValues}
      validationSchema={validatiinSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      {() => <>{children}</>}
    </Formik>
  );
}
