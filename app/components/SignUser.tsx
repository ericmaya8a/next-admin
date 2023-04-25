import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function handleSignOut() {
  signOut({
    redirect: true,
    callbackUrl: "/",
  });
}

export default function SignUser() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <p>
        {session.user?.image ? (
          <span>
            <Image
              src={session.user.image}
              alt={session.user.name ?? "user image"}
              width={20}
              height={20}
              style={{ borderRadius: "100%" }}
            />
          </span>
        ) : null}
        <span> {session.user?.email} </span>
        <button onClick={handleSignOut}>Sign out</button>
      </p>
    );
  }

  return <Link href="/login">Sign in</Link>;
}
