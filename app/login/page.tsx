"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { FaGithub } from "react-icons/fa";
import { FormikForm } from "../components/commons/FormikForm";
import { FormikFormField } from "../components/commons/FormikFormField";
import { FormikSubmitButton } from "../components/commons/FormikSubmitButton";
import styles from "./Login.module.css";

type FormProps = {
  email: string;
  password: string;
};

const URL = "/admin";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required().label("Email"),
  password: Yup.string().min(7).required().label("Password"),
});

const initialValues: FormProps = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSignInWithGithub() {
    setLoading(true);
    try {
      await signIn("github", {
        redirect: true,
        callbackUrl: URL,
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
        callbackUrl: URL,
        email,
        password,
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.card}>
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
          />
          <FormikFormField
            label="Password"
            id="password"
            name="password"
            type="password"
            width="100%"
          />
          <FormikSubmitButton
            severity="info"
            loading={loading}
            label="Sign in"
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
      </div>
    </div>
  );
}
