import { Header } from "@/app/components/commons/Header";
import { FaCalendarAlt } from "react-icons/fa";

export function InscriptionHeader() {
  return (
    <Header icon={<FaCalendarAlt color="var(--primary-color)" />}>
      Inscription
    </Header>
  );
}
