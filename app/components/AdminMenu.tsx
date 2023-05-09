"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { CONSTANTS } from "../constatnts";
import SignUser from "./SignUser";

function setSeverity(matchPath: boolean) {
  return matchPath ? undefined : "secondary";
}

export function AdminMenu() {
  const path = usePathname();

  return (
    <Menubar
      model={[
        {
          template: (
            <Link href={CONSTANTS.urls.HOME}>
              <Button
                icon={PrimeIcons.HOME}
                label="Home"
                iconPos="right"
                severity={setSeverity(path === CONSTANTS.urls.HOME)}
                text
              />
            </Link>
          ),
        },
        {
          template: (
            <Link href={CONSTANTS.urls.ADMIN}>
              <Button
                icon={PrimeIcons.BOOK}
                label="Admin"
                iconPos="right"
                severity={setSeverity(path === CONSTANTS.urls.ADMIN)}
                text
              />
            </Link>
          ),
        },
        {
          template: (
            <Link href={CONSTANTS.urls.STUDENTS}>
              <Button
                icon={PrimeIcons.USERS}
                label="Students"
                iconPos="right"
                severity={setSeverity(path === CONSTANTS.urls.STUDENTS)}
                text
              />
            </Link>
          ),
        },
      ]}
      end={<SignUser />}
    />
  );
}
