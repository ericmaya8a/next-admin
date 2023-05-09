"use client";

import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { FaOptinMonster } from "react-icons/fa";
import styled from "styled-components";
import { CONSTANTS } from "../constatnts";

type WelcomeProps = {
  session: Session | null;
};

export function Welcome({ session }: WelcomeProps) {
  const router = useRouter();
  const hasSession = Boolean(session);

  return (
    <>
      <Tooltip target=".logo" />
      <Container>
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
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: var(--highlight-bg);
  display: grid;
  min-height: 100vh;
`;

const StyledButton = styled(Button)`
  font-size: 10rem;
  height: 14rem !important;
  place-self: center;
  width: 14rem !important;

  @media only screen and (min-width: 600px) {
    font-size: 20rem;
    height: 26rem !important;
    width: 26rem !important;
  }
`;
