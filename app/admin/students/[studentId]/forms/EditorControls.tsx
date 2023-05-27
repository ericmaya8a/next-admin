import { PrimeIcons } from "primereact/api";
import styled from "styled-components";
import { useStudentInfo } from "../studentInfoContext";

type EditorControlsProps = {
  readOnly?: boolean;
};

export function EditorControls({ readOnly = false }: EditorControlsProps) {
  const { onClose } = useStudentInfo();

  return (
    <Controls>
      <div>
        <button
          className="ql-bold"
          aria-label="Bold"
          disabled={readOnly}
        ></button>
        <button
          className="ql-italic"
          aria-label="Italic"
          disabled={readOnly}
        ></button>
        <button
          className="ql-underline"
          aria-label="Underline"
          disabled={readOnly}
        ></button>
      </div>
      {readOnly ? null : (
        <div>
          <CloseButton className={PrimeIcons.TIMES_CIRCLE} onClick={onClose} />
        </div>
      )}
    </Controls>
  );
}

const Controls = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const CloseButton = styled.span`
  color: var(--primary-color);
  cursor: pointer;
  font-size: 1.2rem;
`;
