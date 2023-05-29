import styled from "styled-components";

interface HeaderProps extends React.HTMLProps<HTMLSpanElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  bold?: boolean;
}

export function Header({
  bold = true,
  children,
  icon,
  iconPosition = "left",
  style,
}: HeaderProps) {
  return (
    <HeaderContainer style={style} bold={bold}>
      {iconPosition === "left" && icon ? icon : null}
      {children}
      {iconPosition === "right" && icon ? icon : null}
    </HeaderContainer>
  );
}

//#region STYLES
const HeaderContainer = styled.span<{ bold: boolean }>`
  align-items: center;
  color: var(--text-color);
  display: flex;
  font-weight: ${({ bold }) => (bold ? 700 : undefined)};
  gap: 5px;
`;
//#endregion
