"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

function handleSignInWithGithub() {
  signIn("github", {
    redirect: true,
    callbackUrl: "/admin",
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
        callbackUrl: "/admin",
        email,
        password,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
      <p>Or sign up with</p>
      <button type="button" onClick={handleSignInWithGithub}>
        Github
      </button>
    </div>
  );
}
