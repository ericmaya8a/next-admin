import { Header } from "@/app/components/commons/Header";
import { FaBirthdayCake } from "react-icons/fa";

export function BirthdayHeader() {
  return (
    <Header icon={<FaBirthdayCake color="var(--primary-color)" />}>
      Birthday
    </Header>
  );
}
