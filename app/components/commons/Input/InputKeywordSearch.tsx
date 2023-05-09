import { InputText } from "primereact/inputtext";
import { IoCloseOutline } from "react-icons/io5";
import styled from "styled-components";

type InputKeywordSearchProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: VoidFunction;
  placeholder?: string;
};

export function InputKeywordSearch({
  placeholder = "Keyword Search",
  value,
  onChange,
  handleClose,
}: InputKeywordSearchProps) {
  return (
    <Container>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </span>
      {value && <CloseIcon onClick={handleClose} />}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const CloseIcon = styled(IoCloseOutline)`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 14px;
`;
