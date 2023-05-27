import { useRef } from "react";
import { Card } from "primereact/card";
import { Editor } from "primereact/editor";
import { Toast, ToastMessage } from "primereact/toast";
import { NoMessages } from "./NoMessages";
import { useStudentInfo } from "../studentInfoContext";
import { EditorControls } from "../forms/EditorControls";
import { NoteForm } from "../forms/NoteForm";

export function Notes() {
  const { isFormOpen, studentInfo, setIsFormOpen } = useStudentInfo();
  const toast = useRef<Toast>(null);

  const showToast = (message: ToastMessage | ToastMessage[]) => {
    toast.current?.show(message);
  };

  if (studentInfo) {
    const { note } = studentInfo;

    return (
      <>
        <Card title="Notes">
          {note.length > 0 ? (
            <>
              {note.map(({ id, content }) => (
                <Editor
                  key={id}
                  headerTemplate={<EditorControls readOnly />}
                  style={{ height: "200px" }}
                  value={content}
                  readOnly
                />
              ))}
            </>
          ) : (
            <>
              {isFormOpen ? (
                <NoteForm showToast={showToast} />
              ) : (
                <NoMessages onClick={() => setIsFormOpen(true)} />
              )}
            </>
          )}
        </Card>
        <Toast position="top-center" ref={toast} />
      </>
    );
  }

  return null;
}
