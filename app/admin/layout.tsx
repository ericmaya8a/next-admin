import { AdminMenu } from "../components/AdminMenu";
import { Container } from "../components/commons/Container";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminMenu />
      <Container>{children}</Container>
    </>
  );
}
