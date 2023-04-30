"use client";

import { Skeleton } from "primereact/skeleton";

export default function Loading() {
  return (
    <div className="Main-loading">
      <Skeleton className="mb-2"></Skeleton>
      <Skeleton width="10rem"></Skeleton>
      <Skeleton width="5rem"></Skeleton>
      <Skeleton height="2rem"></Skeleton>
      <Skeleton width="10rem" height="4rem"></Skeleton>
    </div>
  );
}
