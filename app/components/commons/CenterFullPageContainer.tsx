"use client";

import { CSSProperties } from "react";
import styled from "styled-components";

type CenterFullPageContainerProps = {
  children: React.ReactNode;
  style?: CSSProperties;
};

export function CenterFullPageContainer({
  children,
  style,
}: CenterFullPageContainerProps) {
  return (
    <Container style={style}>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  min-height: 100vh;
`;

const ChildrenWrapper = styled.div`
  place-self: center;
`;
