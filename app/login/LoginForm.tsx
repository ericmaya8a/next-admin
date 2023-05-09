"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { CONSTANTS } from "../constatnts";
import { FullPageFormWrapper } from "../components/commons/FullPageFormWrapper";
import { FormikForm } from "../components/commons/Form/FormikForm";
import { FormikFormField } from "../components/commons/Form/FormikFormField";
import { FormikSubmitButton } from "../components/commons/Form/FormikSubmitButton";
import { LoginSchema } from "../server/validationSchemas";

type FormProps = {
  email: string;
  password: string;
};

const initialValues: FormProps = {
  email: "",
  password: "",
};

export function LoginForm() {
  const searchParams = useSearchParams();
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const [hideError, setHideError] = useState(false);
  const hasError = searchParams.toString().includes("error");

  async function handleSignInWithGithub() {
    setLoading(true);
    try {
      await signIn("github", {
        redirect: true,
        callbackUrl: CONSTANTS.urls.ADMIN,
      });
    } catch (error) {
      console.log(error);
      toast.current?.show(CONSTANTS.messages.serverError);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async ({ email, password }: FormProps) => {
    const lowerCaseEmail = email.toLowerCase();
    setLoading(true);
    try {
      await signIn("credentials", {
        redirect: true,
        callbackUrl: CONSTANTS.urls.ADMIN,
        email: lowerCaseEmail,
        password,
      });
    } catch (error) {
      console.log({ error });
      toast.current?.show(CONSTANTS.messages.serverError);
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
    <>
      <Toast position="bottom-left" ref={toast} />
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
          validatiinSchema={LoginSchema}
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
            icon={PrimeIcons.CHECK}
            loading={loading}
            label="Log in"
          />
        </FormikForm>

        <p>Or sign up with</p>
        <Button
          type="button"
          outlined
          onClick={handleSignInWithGithub}
          icon={<FaGithub />}
          loading={loading}
        />
      </FullPageFormWrapper>
    </>
  );
}
