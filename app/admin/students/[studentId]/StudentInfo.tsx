"use client";

import { PageHeader } from "@/app/components/commons/PageHeader";
import { CONSTANTS } from "@/app/constatnts";
import { AppBreadCrumb } from "@/app/components/commons/AppBreadCrumb";
import { DisplayData } from "@/app/components/commons/DisplayData";
import { StudentInfo } from "./page";

type StudentInfoProps = {
  data: StudentInfo;
};

export function StudentInfo({ data }: StudentInfoProps) {
  return (
    <>
      <AppBreadCrumb
        model={[
          { label: "Admin", url: CONSTANTS.urls.ADMIN },
          { label: "Students", url: CONSTANTS.urls.STUDENTS },
        ]}
      />
      <PageHeader title={`${data?.firstName} ${data?.lastName}`} />
      <DisplayData data={data} />
    </>
  );
}
