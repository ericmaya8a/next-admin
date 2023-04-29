import Link from "next/link";
import { MenuItem } from "primereact/menuitem";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import SignUser from "./SignUser";

const items: MenuItem[] = [
  {
    template: (
      <Link href="/">
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
      <Link href="/about">
        <Button
          icon={PrimeIcons.QUESTION}
          label="About"
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
];

export function Menu() {
  return <Menubar model={items} end={<SignUser />} />;
}
