import { Uniform } from "@prisma/client";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { useStudentInfo } from "../studentInfoContext";
import { UniformTable } from "./UniformTable";

export type UniformsT = Omit<Uniform, "date"> & { date: string };

export function Uniforms() {
  //#region HOOKS
  const { studentInfo } = useStudentInfo();
  //#endregion

  if (studentInfo) {
    //#region LOGIC
    const { uniform } = studentInfo;
    const hasUniforms: boolean = uniform.length > 0;
    //#endregion

    //#region JSX
    return (
      <Card title="Uniforms">
        {hasUniforms ? (
          <UniformTable data={uniform as UniformsT[]} />
        ) : (
          <Message
            severity="info"
            text="No uniforms so far"
            style={{ width: "100%", justifyContent: "flex-start" }}
          />
        )}
      </Card>
    );
    //#endregion
  }

  return null;
}
