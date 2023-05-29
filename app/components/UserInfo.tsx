import { useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { PrimeIcons } from "primereact/api";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { ConfirmPopup } from "primereact/confirmpopup";
import "./UserInfo.css";

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
  //#region HOOKS
  const [visible, setVisible] = useState<boolean>(false);
  const divEl = useRef(null);
  //#endregion

  //#region JSX
  return (
    <>
      <ConfirmPopup
        className="UserInfo"
        // @ts-ignore
        target={divEl.current}
        visible={visible}
        onHide={() => setVisible(false)}
        message={<strong>{session.user?.email}</strong>}
        footer={
          <div className="p-confirm-popup-footer">
            <Button
              icon={PrimeIcons.SIGN_OUT}
              iconPos="right"
              label="Sign out"
              onClick={() => {
                handleSignOut();
                setVisible(false);
              }}
            />
          </div>
        }
      />
      <div
        className="user-info-avatar"
        ref={divEl}
        onClick={() => setVisible(!visible)}
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name ?? "user image"}
            width={24}
            height={24}
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <Avatar size="normal" shape="circle" icon={<AiOutlineUser />} />
        )}
      </div>
    </>
  );
  //#endregion
}
