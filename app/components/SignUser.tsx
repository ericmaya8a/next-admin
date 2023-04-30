import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserInfo } from "./UserInfo";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";

export default function SignUser() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <UserInfo session={session} />;
  }

  return (
    <Link href="/login">
      <Button
        label="Log in"
        severity="secondary"
        text
        icon={PrimeIcons.SIGN_IN}
        iconPos="right"
      />
    </Link>
  );
}
