import { Avatar, Popover } from "antd";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { Button } from "./commons/Button/Button";

function handleSignOut() {
  signOut({
    redirect: true,
    callbackUrl: "/",
  });
}

type UserInfoProps = {
  session: Session;
};

export function UserInfo({ session }: UserInfoProps) {
  const content = (
    <div style={{ textAlign: "center" }}>
      <p>
        <strong>{session.user?.email}</strong>
      </p>
      <Button type="primary" icon={<FaSignOutAlt />} onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );

  return (
    <Popover content={content} trigger="click">
      {session.user?.image ? (
        <Image
          src={session.user.image}
          alt={session.user.name ?? "user image"}
          width={24}
          height={24}
          style={{ borderRadius: "100%" }}
        />
      ) : (
        <Avatar size="small" icon={<AiOutlineUser />} />
      )}
    </Popover>
  );
}
