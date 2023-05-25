"use client";

import { Skeleton } from "primereact/skeleton";
import styled from "styled-components";

export function StudentSkeleton() {
  return (
    <>
      <SkeletonWithMargin height="39.09px" width="241px" />
      <SkeletonWithMargin height="36.8px" width="207px" />
      <Skeleton height="341.38px" />
    </>
  );
}

const SkeletonWithMargin = styled(Skeleton)`
  margin-bottom: 1rem;
`;
