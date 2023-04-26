import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserInfo } from "./UserInfo";

export default function SignUser() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <UserInfo session={session} />;
  }

  return <Link href="/login">Sign in</Link>;
}
