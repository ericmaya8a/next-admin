import styled from "styled-components";

type RowProps = {
  children: React.ReactNode;
};

export function Row({ children }: RowProps) {
  return <StyledRow>{children}</StyledRow>;
}

const StyledRow = styled.div`
  display: block;

  div {
    width: 100%;
  }

  @media (min-width: 768px) {
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
  }
`;
