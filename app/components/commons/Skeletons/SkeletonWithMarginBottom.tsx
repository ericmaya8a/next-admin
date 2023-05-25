import { Skeleton, SkeletonProps } from "primereact/skeleton";
import styled from "styled-components";

interface SkeletonWithMarginBottomProps extends SkeletonProps {
  marginBottom?: string;
}

export function SkeletonWithMarginBottom({
  marginBottom,
  ...otherProps
}: SkeletonWithMarginBottomProps) {
  return (
    <SkeletonWithMargin
      marginBottom={(marginBottom = "1rem")}
      {...otherProps}
    />
  );
}

const SkeletonWithMargin = styled(Skeleton)<SkeletonWithMarginBottomProps>`
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;
