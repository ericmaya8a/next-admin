"use client";

import { FaBan, FaCheckCircle } from "react-icons/fa";
import styled from "styled-components";
import { CONSTANTS } from "@/app/constatnts";
import { AppBreadCrumb } from "@/app/components/commons/AppBreadCrumb";
import { PageHeader } from "@/app/components/commons/PageHeader";
import { GeneralInfo } from "./Cards/GeneralInfo";
import { StudentInfo } from "./page";
import { ContactInfo } from "./Cards/ContactInfo";
import { PromotionInfo } from "./Cards/PromotionInfo";
import { Notes } from "./Cards/Notes";

type StudentInfoProps = {
  data: StudentInfo;
};

export const COLOR = "var(--primary-color)";

export function StudentInfo({ data }: StudentInfoProps) {
  const title = (
    <h1 style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      {data?.name}
      {data?.active ? (
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
        <GeneralInfo info={data} />
        <ContactInfo info={data} />
        <PromotionInfo info={data} />
        <Notes info={data} />
      </Grid>
    </>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`;
