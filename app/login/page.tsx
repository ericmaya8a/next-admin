"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button, Card, Form, Input } from "antd";
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

  const handleSubmit = async () => {
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
      <Card className={styles.card}>
        <Form noValidate layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email" name="email">
            <Input
              name="email"
              type="email"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
            />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input
              name="password"
              type="password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form>

        <p>Or sign up with</p>
        <Button
          type="primary"
          ghost
          htmlType="button"
          onClick={handleSignInWithGithub}
          icon={<FaGithub />}
        />
      </Card>
    </div>
  );
}
