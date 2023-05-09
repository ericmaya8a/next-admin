import { Gender } from "@prisma/client";
import { BiMale, BiFemale, BiMaleFemale } from "react-icons/bi";

type GenderIconProps = {
  type: Gender;
};

const SIZE = 25;

export function GenderIcon({ type }: GenderIconProps) {
  switch (type) {
    case "MALE":
      return <BiMale color="var(--blue-500)" size={SIZE} />;
    case "OTHER":
      return <BiMaleFemale color="var(--primary-color)" size={SIZE} />;
    default:
      return <BiFemale color="var(--pink-500)" size={SIZE} />;
  }
}
