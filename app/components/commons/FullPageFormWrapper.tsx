import React from "react";
import { Card } from "primereact/card";
import styled from "styled-components";

type FullPageFormWrapperProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
};

export function FullPageFormWrapper({
  children,
  title,
}: FullPageFormWrapperProps) {
  return (
    <Container>
      <Card title={title}>{children}</Card>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--highlight-bg);
  display: grid;
  margin-left: -1rem;
  margin-right: -1rem;
  min-height: calc(100vh - 62.4px);

  p {
    margin-top: 1em;
  }

  .p-card {
    height: auto;
    place-self: center;
    text-align: center;
    width: 100%;
  }

  @media only screen and (min-width: 600px) {
    .p-card {
      width: 50%;
    }
  }

  @media only screen and (min-width: 992px) {
    .p-card {
      width: 30%;
    }
  }
`;
