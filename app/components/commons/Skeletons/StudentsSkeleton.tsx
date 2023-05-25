"use client";

import { Skeleton } from "primereact/skeleton";
import styled from "styled-components";

export function StudentsSkeleton() {
  return (
    <>
      <Wrapper>
        <Skeleton height="39.09px" width="241px" />
        <Skeleton height="48px" width="48px" shape="circle" />
      </Wrapper>
      <Skeleton height="500px" />
    </>
  );
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
