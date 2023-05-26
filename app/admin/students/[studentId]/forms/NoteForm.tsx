import { PrimeIcons } from "primereact/api";
import { Editor } from "primereact/editor";
import styled from "styled-components";

type NoteFormProps = {
  onClose: VoidFunction;
};

export function NoteForm({ onClose }: NoteFormProps) {
  return (
    <Editor
      headerTemplate={
        <Controls>
          <div>
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
          </div>
          <div>
            <CloseButton
              className={PrimeIcons.TIMES_CIRCLE}
              onClick={onClose}
            />
          </div>
        </Controls>
      }
      style={{ height: "200px" }}
      placeholder="Here your note..."
    />
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
