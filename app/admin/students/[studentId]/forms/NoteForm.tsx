import { NotesSchema } from "@/app/server/validationSchemas";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputTextarea } from "primereact/inputtextarea";
import { ToastMessage } from "primereact/toast";
import { useStudentInfo } from "../studentInfoContext";
import { handleInvalidClassName } from "@/app/clientUtils";
import { FormikFieldError } from "@/app/components/commons/Form/FormikFieldError";
import { ModalButtonWrapper } from "@/app/components/commons/ModalButtonWrapper";
import { SmallButton } from "@/app/components/commons/SmallButton";
import { NoteFormControls } from "./NoteFormControls";

type NoteFormT = {
  content: string;
  studentId: string;
};

type NoteFormProps = {
  isEditMode?: boolean;
  noteId?: string;
  content?: string;
  date?: string;
  style?: React.CSSProperties;
  closeNew?: VoidFunction;
  handleConfirm?: (id: string) => void;
  showToast: (message: ToastMessage | ToastMessage[]) => void;
};

export function NoteForm({
  isEditMode = false,
  noteId,
  content,
  date,
  style,
  closeNew,
  handleConfirm,
  showToast,
}: NoteFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { studentId } = useParams();
  const { createNote, onClose, refreshPage, updateStudentNote } =
    useStudentInfo();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<NoteFormT>({
    defaultValues: {
      content: isEditMode ? content : "",
      studentId,
    },
    resolver: yupResolver(NotesSchema),
  });
  const isDisabled: boolean = isEditMode && !isEditing;
  const buttonLabel = isEditMode ? "Update" : "Save";

  const handleClose = () => {
    refreshPage();
    setIsEditing(false);
    if (closeNew) {
      closeNew();
    }
    onClose();
  };

  const onSubmit = async ({ content, studentId }: NoteFormT) => {
    const response = isEditMode
      ? await updateStudentNote({ id: noteId!, content, studentId })
      : await createNote({ content, studentId });
    const ok = response.ok;

    if (!ok) {
      return showToast({
        summary: "Error",
        detail: "Invalid Data",
        severity: "error",
      });
    }

    showToast({
      summary: "Success",
      detail: `Note successfully ${isEditMode ? "updated" : "created"}`,
      severity: "success",
    });
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={style} noValidate>
      {isEditMode ? (
        <NoteFormControls
          date={date}
          onEdit={() => setIsEditing(true)}
          onRemove={() => {
            if (handleConfirm) {
              handleConfirm(noteId!);
            }
          }}
        />
      ) : null}
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <>
            <InputTextarea
              id={field.name}
              {...field}
              rows={4}
              className={handleInvalidClassName(errors.content?.message)}
              placeholder="Your note here..."
              style={{ width: "100%" }}
              disabled={isDisabled}
            />
            <FormikFieldError error={errors.content?.message} />
          </>
        )}
      />

      <ModalButtonWrapper style={{ margin: "0.3rem 0 0" }}>
        <SmallButton
          type="submit"
          label={buttonLabel}
          loading={isSubmitting}
          disabled={isDisabled}
          outlined
        />
        <SmallButton
          type="button"
          label="Cancel"
          severity="danger"
          disabled={isSubmitting || isDisabled}
          onClick={handleClose}
          outlined
        />
      </ModalButtonWrapper>
    </form>
  );
}
