import { Suspense } from "react";
import { getSessionFromServer } from "./server/utils";
import { Welcome } from "./components/Welcome";
import { MainPageLoading } from "./MainPageLoading";

export default async function Home() {
  const session = await getSessionFromServer();

  return (
    <Suspense fallback={<MainPageLoading />}>
      <Welcome session={session} />
    </Suspense>
  );
}
