"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { FaGithub } from "react-icons/fa";
import { FormikForm } from "../components/commons/FormikForm";
import { FormikFormField } from "../components/commons/FormikFormField";
import { FormikSubmitButton } from "../components/commons/FormikSubmitButton";
import { FullPageFormWrapper } from "../components/commons/FullPageFormWrapper";
import { CONSTANTS } from "../constatnts";

type FormProps = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
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
  email: "",
  password: "",
};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const hasError = Boolean(searchParams.toString());
  const [loading, setLoading] = useState(false);
  const [hideError, setHideError] = useState(false);

  async function handleSignInWithGithub() {
    setLoading(true);
    try {
      await signIn("github", {
        redirect: true,
        callbackUrl: CONSTANTS.urls.ADMIN,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async ({ email, password }: FormProps) => {
    setLoading(true);
    try {
      await signIn("credentials", {
        redirect: true,
        callbackUrl: CONSTANTS.urls.ADMIN,
        email,
        password,
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    if (hasError) {
      setHideError(true);
    }
  };

  return (
    <FullPageFormWrapper>
      {hasError && !hideError ? (
        <Message
          severity="error"
          text="Invalid Email or Password"
          style={{ marginBottom: "1rem" }}
        />
      ) : null}
      <FormikForm<FormProps>
        initialValues={initialValues}
        validatiinSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormikFormField
          label="Email"
          id="email"
          name="email"
          type="email"
          width="100%"
          onChange={handleError}
        />
        <FormikFormField
          label="Password"
          id="password"
          name="password"
          type="password"
          width="100%"
          onChange={handleError}
        />
        <FormikSubmitButton
          type="submit"
          severity="info"
          loading={loading}
          label="Log in"
        />
      </FormikForm>

      <p>Or sign up with</p>
      <Button
        type="button"
        severity="info"
        outlined
        onClick={handleSignInWithGithub}
        icon={<FaGithub />}
        loading={loading}
      />
    </FullPageFormWrapper>
  );
}
