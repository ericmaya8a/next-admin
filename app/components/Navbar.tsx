import Link from "next/link";
import SignUser from "./SignUser";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
        <li>
          <SignUser />
        </li>
      </ul>
    </nav>
  );
}
