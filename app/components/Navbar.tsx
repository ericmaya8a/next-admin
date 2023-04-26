import Link from "next/link";
import SignUser from "./SignUser";
import { Col, Menu, MenuProps, Row } from "antd";

const menuItems: MenuProps["items"] = [
  {
    label: <Link href="/">Home</Link>,
    key: "home",
  },
  {
    label: <Link href="/about">About</Link>,
    key: "about",
  },
  {
    label: <Link href="/admin">Admin</Link>,
    key: "admin",
  },
];

const userItems: MenuProps["items"] = [
  {
    label: <SignUser />,
    key: "sign-user",
  },
];

export default function Navbar() {
  return (
    <Row>
      <Col xs={18} sm={20} md={21} lg={22}>
        <Menu mode="horizontal" items={menuItems} />
      </Col>
      <Col xs={6} sm={4} md={3} lg={2}>
        <Menu mode="horizontal" items={userItems} />
      </Col>
    </Row>
  );
}
