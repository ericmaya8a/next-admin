import { DisplayData } from "./components/commons/DisplayData";
import { getSessionFromServer } from "./server/utils";

export default async function Home() {
  const session = await getSessionFromServer();

  return (
    <>
      <h1>Hello Next.js!</h1>
      {session ? <DisplayData<typeof session> data={session} /> : null}
    </>
  );
}
