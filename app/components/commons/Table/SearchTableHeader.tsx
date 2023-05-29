import styled from "styled-components";
import { InputKeywordSearch } from "../Input/InputKeywordSearch";

type SearchTableHeaderProps = {
  children: React.ReactNode;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: VoidFunction;
};

export function SearchTableHeader({
  children,
  value,
  placeholder,
  onChange,
  handleClose,
}: SearchTableHeaderProps) {
  return (
    <HeaderContainer>
      {children}
      <InputKeywordSearch
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        handleClose={handleClose}
      />
    </HeaderContainer>
  );
}

//#region STYLES
const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
//#endregion
