"use client";

import { Skeleton } from "primereact/skeleton";
import styled from "styled-components";

export default function Loading() {
  return (
    <Container>
      <StyledSkeleton height="416px" width="416px" shape="circle" />
    </Container>
  );
}

const Loader = styled.div`
  max-width: 50%;

  .p-skeleton {
    margin-bottom: 5px;
  }
`;

const Container = styled.div`
  display: grid;
  min-height: 100vh;
`;

const StyledSkeleton = styled(Skeleton)`
  place-self: center;
`;
