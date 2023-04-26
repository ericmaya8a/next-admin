import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "Create Next App",
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1>Hello Next.js!</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
