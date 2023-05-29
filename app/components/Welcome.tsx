"use client";

import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { FaOptinMonster } from "react-icons/fa";
import styled from "styled-components";
import { CONSTANTS } from "../constatnts";
import { CenterFullPageContainer } from "./commons/CenterFullPageContainer";

type WelcomeProps = {
  session: Session | null;
};

export function Welcome({ session }: WelcomeProps) {
  //#region HOOKS
  const router = useRouter();
  //#endregion

  //#region LOGIC
  const hasSession = Boolean(session);
  //#endregion

  //#region JSX
  return (
    <>
      <Tooltip target=".logo" />
      <CenterFullPageContainer
        style={{ backgroundColor: "var(--highlight-bg)" }}
      >
        <StyledButton
          className="logo"
          icon={<FaOptinMonster />}
          aria-label="Login"
          rounded
          onClick={() =>
            router.push(CONSTANTS.urls[hasSession ? "ADMIN" : "LOGIN"])
          }
          tooltip={hasSession ? JSON.stringify(session) : undefined}
          tooltipOptions={hasSession ? { position: "top" } : undefined}
        />
      </CenterFullPageContainer>
    </>
  );
  //#endregion
}

//#region STYLES
const StyledButton = styled(Button)`
  font-size: 10rem;
  height: 14rem !important;
  width: 14rem !important;

  @media only screen and (min-width: 600px) {
    font-size: 20rem;
    height: 26rem !important;
    width: 26rem !important;
  }
`;
//#endregion
