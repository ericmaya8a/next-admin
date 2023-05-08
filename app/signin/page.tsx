import { FormProps, SigninForm } from "./SigninForm";
import { createUser } from "../server/users";

export const metadata = {
  title: "Sign in",
};

export default function SigninPage() {
  const addUser = async ({ name, email, password }: FormProps) => {
    "use server";
    const { ok } = await createUser({ name, email, password });
    return { ok };
  };

  return <SigninForm createUser={addUser} />;
}
