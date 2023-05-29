import React, { useRef, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Divider } from "primereact/divider";
import { Toast, ToastMessage } from "primereact/toast";
import { NoMessages } from "./NoMessages";
import { useStudentInfo } from "../studentInfoContext";
import { NoteForm } from "../forms/NoteForm";
import { NoteTitle } from "./NoteTitle";

export function Notes() {
  const [isNewNote, setIsNewNote] = useState(false);
  const { isFormOpen, studentInfo, deleteNote, setIsFormOpen, refreshPage } =
    useStudentInfo();
  const toast = useRef<Toast>(null);

  const handleConfirm = (id: string) => {
    confirmDialog({
      message: "Do you want to delete this note?",
      header: "Delete Confirmation",
      icon: PrimeIcons.INFO_CIRCLE,
      async accept() {
        const { ok } = await deleteNote(id);

        if (!ok) {
          return showToast({
            summary: "Error",
            detail: "Invalid Data",
            severity: "error",
          });
        }

        showToast({
          summary: "Success",
          detail: "Note successfully removed",
          severity: "success",
        });
        refreshPage();
      },
    });
  };

  const showToast = (message: ToastMessage | ToastMessage[]) => {
    toast.current?.show(message);
  };

  if (studentInfo) {
    const { note } = studentInfo;
    const hasNotes: boolean = note.length > 0;

    return (
      <>
        <Card
          title={
            hasNotes ? (
              <NoteTitle onClick={() => setIsNewNote(true)} />
            ) : (
              "Notes"
            )
          }
        >
          {hasNotes ? (
            <>
              {isNewNote ? (
                <NoteForm
                  showToast={showToast}
                  closeNew={() => setIsNewNote(false)}
                  style={{ marginBottom: "1.5rem" }}
                />
              ) : null}
              {note.map(({ id, content, updatedAt }, index) => (
                <React.Fragment key={id}>
                  {index > 0 ? <Divider /> : null}
                  <NoteForm
                    content={content}
                    date={updatedAt}
                    showToast={showToast}
                    noteId={id}
                    isEditMode
                    handleConfirm={handleConfirm}
                  />
                </React.Fragment>
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
        <ConfirmDialog />
      </>
    );
  }

  return null;
}
