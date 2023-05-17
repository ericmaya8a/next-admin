import { Dialog } from "primereact/dialog";
import { useStudent } from "./student-context";
import { StudentForm } from "./StudentForm";

type StudentModalProps = {
  isOpen: boolean;
  handleClose: VoidFunction;
  showToast: (message: string) => void;
};

export function StudentModal({
  isOpen,
  handleClose,
  showToast,
}: StudentModalProps) {
  const { currentStudent } = useStudent();

  return (
    <Dialog
      header={`${Boolean(currentStudent) ? "Edit" : "Add"} Student`}
      visible={isOpen}
      onHide={handleClose}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      style={{ minWidth: "50vw" }}
    >
      <StudentForm handleClose={handleClose} handleToast={showToast} />
    </Dialog>
  );
}
