import { useState } from "react";
import { Card } from "primereact/card";
import { StudentInfo } from "../page";
import { NoteForm } from "../forms/NoteForm";
import { NoMessages } from "./NoMessages";

type NotesProps = {
  info: StudentInfo;
};

export function Notes({ info }: NotesProps) {
  const [showForm, setShowForm] = useState(false);

  if (info) {
    const { note } = info;

    return (
      <Card title="Notes">
        {note.length > 0 ? (
          <>
            {note.map(({ id, content }) => (
              <p key={id}>{content}</p>
            ))}
          </>
        ) : (
          <>
            {showForm ? (
              <NoteForm onClose={() => setShowForm(false)} />
            ) : (
              <NoMessages onClick={() => setShowForm(true)} />
            )}
          </>
        )}
      </Card>
    );
  }

  return null;
}
