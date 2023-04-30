"use client";

import { useState } from "react";
import * as Yup from "yup";
import { FullPageFormWrapper } from "../components/commons/FullPageFormWrapper";
import { FormikForm } from "../components/commons/FormikForm";
import { FormikFormField } from "../components/commons/FormikFormField";
import { FormikSubmitButton } from "../components/commons/FormikSubmitButton";

type FormProps = {
  name: string;
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required().label("Name"),
  email: Yup.string().email("Invalid Email").required().label("Email"),
  password: Yup.string().min(7).required().label("Password"),
});

const initialValues: FormProps = {
  name: "",
  email: "",
  password: "",
};

export default function SigninPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ name, email, password }: FormProps) => {
    setLoading(true);
    console.log({ name, email, password });
    setLoading(false);
  };

  return (
    <FullPageFormWrapper title="Sign in">
      <FormikForm<FormProps>
        initialValues={initialValues}
        validatiinSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormikFormField label="Name" id="name" name="name" width="100%" />
        <FormikFormField
          label="Email"
          id="email"
          name="email"
          type="email"
          width="100%"
        />
        <FormikFormField
          label="Password"
          id="password"
          name="password"
          type="password"
          width="100%"
        />
        <FormikSubmitButton
          security="info"
          loading={loading}
          label="Register"
          type="submit"
        />
      </FormikForm>
    </FullPageFormWrapper>
  );
}
