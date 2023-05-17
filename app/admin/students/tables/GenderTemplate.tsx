import { Student } from "@prisma/client";
import { GenderIcon } from "@/app/components/commons/GenderIcon";

export function genderTemplate({ gender }: Student) {
  return <GenderIcon type={gender} />;
}
