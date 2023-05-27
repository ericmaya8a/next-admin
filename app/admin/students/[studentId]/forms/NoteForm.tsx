import { NotesSchema } from "@/app/server/validationSchemas";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { ToastMessage } from "primereact/toast";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useStudentInfo } from "../studentInfoContext";
import { FormikFieldError } from "@/app/components/commons/Form/FormikFieldError";
import { ModalButtonWrapper } from "@/app/components/commons/ModalButtonWrapper";
import { EditorControls } from "./EditorControls";

type NoteFormT = {
  content: string;
  studentId: string;
};

type NoteFormProps = {
  showToast: (message: ToastMessage | ToastMessage[]) => void;
};

export function NoteForm({ showToast }: NoteFormProps) {
  const { studentId } = useParams();
  const { createNote, onClose, refreshPage } = useStudentInfo();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<NoteFormT>({
    defaultValues: {
      content: "",
      studentId,
    },
    resolver: yupResolver(NotesSchema),
  });

  const onSubmit = async ({ content, studentId }: NoteFormT) => {
    const { ok } = await createNote({ content, studentId });

    if (!ok) {
      return showToast({
        summary: "Error",
        detail: "Invalid Data",
        severity: "error",
      });
    }

    showToast({
      summary: "Success",
      detail: "Note successfully created",
      severity: "success",
    });
    refreshPage();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <>
            <Editor
              id={field.name}
              name="content"
              value={field.value}
              headerTemplate={<EditorControls />}
              onTextChange={(e: EditorTextChangeEvent) =>
                field.onChange(e.textValue)
              }
              style={{ height: "200px" }}
              placeholder="Here your note..."
            />
            <FormikFieldError error={errors.content?.message} />
          </>
        )}
      />

      <ModalButtonWrapper style={{ marginTop: "1rem" }}>
        <Button type="submit" label="Save" loading={isSubmitting} />
      </ModalButtonWrapper>
    </form>
  );
}
