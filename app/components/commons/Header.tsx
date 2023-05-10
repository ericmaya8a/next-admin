import styled from "styled-components";

interface HeaderProps extends React.HTMLProps<HTMLSpanElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function Header({
  children,
  icon,
  iconPosition = "left",
  style,
}: HeaderProps) {
  return (
    <HeaderContainer style={style}>
      {iconPosition === "left" && icon ? icon : null}
      {children}
      {iconPosition === "right" && icon ? icon : null}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.span`
  align-items: center;
  color: var(--text-color);
  display: flex;
  font-weight: 700;
  gap: 5px;
`;
