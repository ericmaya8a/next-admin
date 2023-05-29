import { Button, ButtonProps } from "primereact/button";
import styled from "styled-components";

interface SmallButtonProps extends ButtonProps {}

export function SmallButton(props: SmallButtonProps) {
  return <Container {...props} />;
}

const Container = styled(Button)`
  font-size: 0.8rem;
  padding: 0.5rem 1rem;

  span {
    font-weight: normal;
  }
`;
