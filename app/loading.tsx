"use client";

import { Skeleton } from "primereact/skeleton";
import styled from "styled-components";

export default function Loading() {
  return (
    <Loader>
      <Skeleton className="mb-2"></Skeleton>
      <Skeleton width="10rem"></Skeleton>
      <Skeleton width="5rem"></Skeleton>
      <Skeleton height="2rem"></Skeleton>
      <Skeleton width="10rem" height="4rem"></Skeleton>
    </Loader>
  );
}

const Loader = styled.div`
  max-width: 50%;

  .p-skeleton {
    margin-bottom: 5px;
  }
`;
