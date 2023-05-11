import { getStudentsNextPayment } from "../server/students";
import { Admin } from "./Admin";

export default async function AdminPage() {
  const nextPayments = await getStudentsNextPayment();

  return <Admin data={nextPayments} />;
}
