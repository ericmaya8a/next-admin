import { getSessionFromServer } from "./server/utils";
import { Welcome } from "./components/Welcome";

export default async function Home() {
  const session = await getSessionFromServer();

  return <Welcome session={session} />;
}
