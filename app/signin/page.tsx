"use client";

import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { FullPageFormWrapper } from "../components/commons/FullPageFormWrapper";
import { FormikForm } from "../components/commons/FormikForm";
import { FormikFormField } from "../components/commons/FormikFormField";
import { FormikSubmitButton } from "../components/commons/FormikSubmitButton";
import { CONSTANTS } from "../constatnts";
import { clientUtils } from "../clientUtils";

type FormProps = {
  name: string;
  email: string;
  password: string;
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
    .required()
    .label("Password"),
});

const initialValues: FormProps = {
  name: "",
  email: "",
  password: "",
};

export default function SigninPage() {
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const handleSubmit = async ({ name, email, password }: FormProps) => {
    setLoading(true);
    try {
      const data = await clientUtils.fetching.post<FormProps>(
        CONSTANTS.urls.REGISTER,
        {
          name,
          email,
          password,
        }
      );

      if (data.ok) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: `User: ${email} was created successfully!`,
        });

        setTimeout(
          async () =>
            await signIn("credentials", {
              redirect: true,
              callbackUrl: CONSTANTS.urls.ADMIN,
              email,
              password,
            }),
          2000
        );

        return;
      }

      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: data.error,
      });
    } catch (error) {
      console.log(error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Server Error, please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast ref={toast} />
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
    </>
  );
}
