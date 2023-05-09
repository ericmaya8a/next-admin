"use client";

import Link from "next/link";
import { MenuItem } from "primereact/menuitem";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { CONSTANTS } from "../constatnts";
import SignUser from "./SignUser";

const items: MenuItem[] = [
  {
    template: (
      <Link href={CONSTANTS.urls.HOME}>
        <Button
          icon={PrimeIcons.HOME}
          label="Home"
          iconPos="right"
          severity="secondary"
          text
        />
      </Link>
    ),
  },
  {
    template: (
      <Link href="/admin">
        <Button
          icon={PrimeIcons.BOOK}
          label="Admin"
          iconPos="right"
          severity="secondary"
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
          severity="secondary"
          text
        />
      </Link>
    ),
  },
];

export function AdminMenu() {
  return <Menubar model={items} end={<SignUser />} />;
}
