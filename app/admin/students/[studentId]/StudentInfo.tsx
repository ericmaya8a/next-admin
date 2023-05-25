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

type StudentInfoProps = {
  data: StudentInfo;
};

export const COLOR = "var(--primary-color)";

export function StudentInfo({ data }: StudentInfoProps) {
  const title = (
    <h1 style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      {data.name}{" "}
      {data.active ? (
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
        <GeneralInfo
          data={{
            age: data.age,
            birthday: data.birthDate,
            gender: data.gender,
            height: data.height,
            inscriptionDate: data.inscriptionDate,
            seniority: data.seniority,
            weight: data.weight,
          }}
          rank={
            data.promotion.length
              ? data.promotion[data.promotion.length - 1].rank
              : undefined
          }
        />
        <ContactInfo
          address={data.address}
          communication={data.communication}
        />
        <PromotionInfo promotion={data.promotion} />
      </Grid>
    </>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`;
