import { FormProps, SigninForm } from "./SigninForm";
import { createUser } from "../server/users";

export const metadata = {
  title: "Sign in",
};

const addUser = async ({ name, email, password }: FormProps) => {
  "use server";
  const { ok } = await createUser({ name, email, password });
  return { ok };
};

export default function SigninPage() {
  return <SigninForm createUser={addUser} />;
}
