"use client";

import styled from "styled-components";

type PageHeaderProps = {
  title: React.ReactNode;
  actions?: React.ReactNode;
};

export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <PageHeaderContainer>
      {typeof title === "string" ? <h1>{title}</h1> : title}
      {Boolean(actions) ? actions : null}
    </PageHeaderContainer>
  );
}

const PageHeaderContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1rem;

  h1 {
    margin: 0;
  }
`;
