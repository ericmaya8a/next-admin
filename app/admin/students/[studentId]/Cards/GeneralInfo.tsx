import { Gender, Rank } from "@prisma/client";
import { TfiRuler } from "react-icons/tfi";
import { GiWeight } from "react-icons/gi";
import { Card } from "primereact/card";
import { FaBirthdayCake, FaCalendarAlt } from "react-icons/fa";
import { Belt } from "@/app/components/commons/Belt";
import { GenderIcon } from "@/app/components/commons/GenderIcon";
import { RowInfo } from "@/app/components/commons/RowInfo";
import { COLOR } from "../StudentInfo";
import { StudentInfo } from "../page";

type GeneralInfoProps = {
  data: {
    age: StudentInfo["age"];
    birthday: StudentInfo["birthDate"];
    gender: StudentInfo["gender"];
    height: StudentInfo["height"];
    inscriptionDate: StudentInfo["inscriptionDate"];
    seniority: StudentInfo["seniority"];
    weight: StudentInfo["weight"];
  };
  rank?: StudentInfo["promotion"][0]["rank"];
};

export function GeneralInfo({
  data: {
    age,
    birthday,
    gender = Gender["OTHER"],
    height,
    inscriptionDate,
    seniority,
    weight,
  },
  rank,
}: GeneralInfoProps) {
  return (
    <Card title="General Info">
      <RowInfo
        title="Gender:"
        icon={<GenderIcon type={gender} />}
        iconPosition="right"
      />
      <RowInfo
        title="Birthday:"
        description={
          <>
            {birthday}
            <small>({age})</small>
          </>
        }
        icon={<FaBirthdayCake color={COLOR} />}
      />
      <RowInfo
        title="Height:"
        description={`${height} m.`}
        icon={<TfiRuler color={COLOR} />}
      />
      <RowInfo
        title="Weight:"
        description={`${weight}kg.`}
        icon={<GiWeight color={COLOR} />}
      />
      <RowInfo
        title="Inscription:"
        description={
          <>
            {inscriptionDate}
            <small>({seniority})</small>
          </>
        }
        icon={<FaCalendarAlt color={COLOR} />}
      />
      <RowInfo
        title=""
        icon={<Belt belt={rank ?? Rank["BLANCA"]} width={90} tooltip />}
      />
    </Card>
  );
}
