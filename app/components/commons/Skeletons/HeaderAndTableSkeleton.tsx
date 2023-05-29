"use client";

import { Skeleton } from "primereact/skeleton";
import styled from "styled-components";

export function HeaderAndTableSkeleton() {
  return (
    <>
      <HeaderSkeleton height="30%" width="10%" />
      <Skeleton height="50vh" />
    </>
  );
}

//#region STYLES
const HeaderSkeleton = styled(Skeleton)`
  margin-bottom: 0.67em;
`;
//#endregion
