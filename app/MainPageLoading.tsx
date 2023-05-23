"use client";

import { Skeleton } from "primereact/skeleton";
import { CenterFullPageContainer } from "./components/commons/CenterFullPageContainer";

export function MainPageLoading() {
  return (
    <CenterFullPageContainer>
      <Skeleton height="416px" width="416px" shape="circle" />
    </CenterFullPageContainer>
  );
}
