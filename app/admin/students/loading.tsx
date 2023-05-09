"use client";

import { Skeleton } from "primereact/skeleton";
import styled from "styled-components";

export default function StudentsLoading() {
  return (
    <>
      <HeaderSkeleton height="36.8px" width="10%" />
      <Skeleton height="50vh" />
    </>
  );
}

const HeaderSkeleton = styled(Skeleton)`
  margin-bottom: 0.67em;
`;
