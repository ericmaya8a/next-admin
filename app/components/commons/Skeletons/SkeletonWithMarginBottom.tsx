import { Skeleton, SkeletonProps } from "primereact/skeleton";
import styled from "styled-components";

interface SkeletonWithMarginBottomProps extends SkeletonProps {
  marginbottom?: string;
}

export function SkeletonWithMarginBottom({
  marginbottom = "1rem",
  ...otherProps
}: SkeletonWithMarginBottomProps) {
  return <SkeletonWithMargin marginbottom={marginbottom} {...otherProps} />;
}

const SkeletonWithMargin = styled(Skeleton)<SkeletonWithMarginBottomProps>`
  margin-bottom: ${({ marginbottom }) => marginbottom};
`;
