import { getStudentsNextPayment } from "../server/students";
import { addTuition } from "../server/tuition";
import { TuitionT } from "./adminContext";
import { Admin } from "./Admin";

export default async function AdminPage() {
  const nextPayments = await getStudentsNextPayment();
  const createTuition = async (tuition: TuitionT) => {
    "use server";
    const { ok } = await addTuition(tuition);
    return { ok };
  };

  return <Admin data={nextPayments} createTuition={createTuition} />;
}
