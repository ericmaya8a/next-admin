"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "primereact/button";
import { FaGithub } from "react-icons/fa";
import styles from "./Login.module.css";

const URL = "/admin";

function handleSignInWithGithub() {
  signIn("github", {
    redirect: true,
    callbackUrl: URL,
  });
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signIn("credentials", {
        redirect: true,
        callbackUrl: URL,
        email,
        password,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <form noValidate onSubmit={handleSubmit}>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
          </label>

          <Button security="Info" type="submit">
            Sign in
          </Button>
        </form>

        <p>Or sign up with</p>
        <Button
          type="button"
          severity="info"
          outlined
          onClick={handleSignInWithGithub}
          icon={<FaGithub />}
        />
      </div>
    </div>
  );
}
