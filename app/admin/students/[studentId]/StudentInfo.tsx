"use client";

import { useParams } from "next/navigation";
import { FaBan, FaCheckCircle } from "react-icons/fa";
import styled from "styled-components";
import { CONSTANTS } from "@/app/constatnts";
import { AppBreadCrumb } from "@/app/components/commons/AppBreadCrumb";
import { PageHeader } from "@/app/components/commons/PageHeader";
import { useStudentInfo } from "./studentInfoContext";
import { GeneralInfo } from "./Cards/GeneralInfo";
import { ContactInfo } from "./Cards/ContactInfo";
import { PromotionInfo } from "./Cards/PromotionInfo";
import { Notes } from "./Cards/Notes";

export const COLOR = "var(--primary-color)";

export function StudentInfo() {
  //#region HOOKS
  const { studentId } = useParams();
  const { studentInfo } = useStudentInfo();
  //#endregion

  //#region JSX
  if (studentInfo) {
    const { name, active } = studentInfo;
    const title = (
      <h1 style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {name}
        {active ? (
          <FaCheckCircle color="var(--green-500)" />
        ) : (
          <FaBan color="var(--red-700)" />
        )}
      </h1>
    );
    return (
      <>
        <AppBreadCrumb
          model={[
            { label: "Admin", url: CONSTANTS.urls.ADMIN },
            { label: "Students", url: CONSTANTS.urls.STUDENTS },
          ]}
        />
        <PageHeader title={title} />
        <Grid className="grid">
          <GeneralInfo />
          <ContactInfo />
          <PromotionInfo />
          <Notes />
        </Grid>
      </>
    );
  }

  return <p>Invalid Student ID: {studentId}</p>;
  //#endregion
}

//#region STYLES
const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`;
//#endregion
