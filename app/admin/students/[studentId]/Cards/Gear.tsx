import { Gear } from "@prisma/client";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { useStudentInfo } from "../studentInfoContext";
import { GearTable } from "./GearTable";

export type GearsT = Omit<Gear, "date"> & { date: string };

export function Gear() {
  //#region HOOKS
  const { studentInfo } = useStudentInfo();
  //#endregion

  if (studentInfo) {
    //#region LOGIC
    const { gear } = studentInfo;
    const hasGear = gear.length > 0;
    //#endregion

    //#region JSX
    return (
      <Card title="Gear">
        {hasGear ? (
          <GearTable data={gear as GearsT[]} />
        ) : (
          <Message
            severity="info"
            text="No gear so far"
            style={{ width: "100%", justifyContent: "flex-start" }}
          />
        )}
      </Card>
    );
    //#endregion
  }

  return null;
}
