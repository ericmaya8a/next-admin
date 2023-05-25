"use client";

import { Skeleton } from "primereact/skeleton";
import { SkeletonWithMarginBottom } from "./SkeletonWithMarginBottom";

export function StudentSkeleton() {
  return (
    <>
      <SkeletonWithMarginBottom height="39.09px" width="241px" />
      <SkeletonWithMarginBottom height="36.8px" width="207px" />
      <Skeleton height="341.38px" />
    </>
  );
}
