"use client";

import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { PrimeIcons } from "primereact/api";
import { FullPageFormWrapper } from "../components/commons/FullPageFormWrapper";
import { FormikForm } from "../components/commons/FormikForm";
import { FormikFormField } from "../components/commons/FormikFormField";
import { FormikSubmitButton } from "../components/commons/FormikSubmitButton";
import { CONSTANTS } from "../constatnts";

export type FormProps = {
  name: string;
  email: string;
  password: string;
};

type SigninFormProps = {
  createUser: (props: FormProps) => Promise<{ ok: boolean }>;
};

const validationSchema = Yup.object({
  name: Yup.string().required().label("Name"),
  email: Yup.string()
    .matches(CONSTANTS.regex.email, { message: "Invalid Email" })
    .required()
    .label("Email"),
  password: Yup.string()
    .min(8)
    .matches(CONSTANTS.regex.password, {
      message: CONSTANTS.messages.invalidPassword,
    })
    .max(16)
    .required()
    .label("Password"),
});

const initialValues: FormProps = {
  name: "",
  email: "",
  password: "",
};

export default function SigninForm(props: SigninFormProps) {
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const handleSubmit = async ({ name, email, password }: FormProps) => {
    const lowerCaseEmail = email.toLowerCase();
    setLoading(true);
    try {
      const response = await props.createUser({
        name,
        email: lowerCaseEmail,
        password,
      });

      if (response.ok) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: `User: ${lowerCaseEmail} was created successfully!`,
        });

        setTimeout(
          async () =>
            await signIn("credentials", {
              redirect: true,
              callbackUrl: CONSTANTS.urls.ADMIN,
              email: lowerCaseEmail,
              password,
            }),
          2000
        );

        return;
      }

      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "User already exist",
      });
    } catch (error) {
      console.log(error);
      toast.current?.show(CONSTANTS.messages.serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast position="top-center" ref={toast} />
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
            icon={PrimeIcons.CHECK}
            iconPos="right"
            loading={loading}
            label="Register"
            type="submit"
          />
        </FormikForm>
      </FullPageFormWrapper>
    </>
  );
}
