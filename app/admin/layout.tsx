import { AdminMenu } from "../components/AdminMenu";
import { MainContainer } from "../components/commons/MainContainer";

export const metadata = {
  title: "Admin",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminMenu />
      <MainContainer>{children}</MainContainer>
    </>
  );
}
