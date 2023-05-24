"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { PrimeIcons } from "primereact/api";
import { setSeverity } from "../clientUtils";
import { CONSTANTS } from "../constatnts";
import SignUser from "./SignUser";

export function AdminMenu() {
  const path = usePathname();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleClose = () => setIsOpenSidebar(false);

  return (
    <>
      <Menu className="p-menubar p-component">
        <Avatar
          icon={PrimeIcons.BARS}
          size="normal"
          shape="circle"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "var(--primary-color-text)",
          }}
          onClick={() => setIsOpenSidebar(true)}
        />
        <SignUser />
      </Menu>
      <Sidebar visible={isOpenSidebar} onHide={handleClose}>
        <ButtonContainer onClick={handleClose}>
          <Link href={CONSTANTS.urls.HOME}>
            <Button
              icon={PrimeIcons.HOME}
              label="Home"
              iconPos="right"
              severity={setSeverity(path === CONSTANTS.urls.HOME)}
              text
            />
          </Link>
        </ButtonContainer>
        <ButtonContainer onClick={handleClose}>
          <Link href={CONSTANTS.urls.ADMIN}>
            <Button
              icon={PrimeIcons.BOOK}
              label="Admin"
              iconPos="right"
              severity={setSeverity(path === CONSTANTS.urls.ADMIN)}
              text
            />
          </Link>
        </ButtonContainer>
        <ButtonContainer onClick={handleClose}>
          <Link href={CONSTANTS.urls.STUDENTS}>
            <Button
              icon={PrimeIcons.USERS}
              label="Students"
              iconPos="right"
              severity={setSeverity(path === CONSTANTS.urls.STUDENTS)}
              text
            />
          </Link>
        </ButtonContainer>
      </Sidebar>
    </>
  );
}

const Menu = styled.div`
  border-radius: 0;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  .p-button {
    text-align: start;
    width: 100%;
  }
`;
