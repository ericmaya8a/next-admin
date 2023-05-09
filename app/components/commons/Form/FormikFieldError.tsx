type FormikFieldErrorProps = {
  error?: string;
};

export function FormikFieldError({ error }: FormikFieldErrorProps) {
  if (error) {
    return <small className="p-error">{error}</small>;
  }

  return null;
}
