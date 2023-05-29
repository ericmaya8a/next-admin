import { Rank } from "@prisma/client";
import { TfiRuler } from "react-icons/tfi";
import { GiWeight } from "react-icons/gi";
import { Card } from "primereact/card";
import { FaBirthdayCake, FaCalendarAlt } from "react-icons/fa";
import { Belt } from "@/app/components/commons/Belt";
import { GenderIcon } from "@/app/components/commons/GenderIcon";
import { RowInfo } from "@/app/components/commons/RowInfo";
import { COLOR } from "../StudentInfo";
import { useStudentInfo } from "../studentInfoContext";

export function GeneralInfo() {
  //#region HOOKS
  const { studentInfo } = useStudentInfo();
  //#endregion

  //#region JSX
  if (studentInfo) {
    const {
      gender,
      birthDate,
      age,
      height,
      weight,
      inscriptionDate,
      seniority,
      promotion,
    } = studentInfo;

    return (
      <Card title="General">
        <RowInfo
          title="Gender:"
          icon={<GenderIcon type={gender} />}
          iconPosition="right"
        />
        <RowInfo
          title="Birthday:"
          description={
            <>
              {birthDate}
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
          icon={
            <Belt
              belt={
                promotion.length
                  ? studentInfo.promotion[studentInfo.promotion.length - 1].rank
                  : Rank["BLANCA"]
              }
              width={90}
              tooltip
            />
          }
        />
      </Card>
    );
  }
  return null;
  //#endregion
}
