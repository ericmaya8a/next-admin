"use client";

import styled from "styled-components";

export function MainContainer({ children }: { children: React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

//#region STYLES
const Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  @media (min-width: 576px) {
    max-width: 540px;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: 768px) {
    max-width: 720px;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: 992px) {
    max-width: 960px;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: 1400px) {
    max-width: 1320px;
    padding-left: 0;
    padding-right: 0;
  }
`;
//#endregion
