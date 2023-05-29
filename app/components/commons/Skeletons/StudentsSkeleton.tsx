"use client";

import { Skeleton } from "primereact/skeleton";
import styled from "styled-components";

export function StudentsSkeleton() {
  return (
    <>
      <Wrapper>
        <Skeleton height="39.09px" width="20%" />
        <Skeleton height="48px" width="48px" shape="circle" />
      </Wrapper>
      <Skeleton height="500px" />
    </>
  );
}

//#region STYLES
const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
//#endregion
