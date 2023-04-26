import { getSessionFromServer } from "./server/utils";

export const metadata = {
  title: "Create Next App",
};

export default async function Home() {
  const session = await getSessionFromServer();

  return (
    <>
      <h1>Hello Next.js!</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
