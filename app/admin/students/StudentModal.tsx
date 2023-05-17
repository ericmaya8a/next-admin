import { Dialog } from "primereact/dialog";
import { ToastMessage } from "primereact/toast";
import { useStudent } from "./student-context";
import { StudentForm } from "./StudentForm";

type StudentModalProps = {
  showToast: (message: ToastMessage | ToastMessage[]) => void;
};

export function StudentModal({ showToast }: StudentModalProps) {
  const { currentStudent, isOpenStudentModal, setIsOpenStudentModal } =
    useStudent();

  return (
    <Dialog
      header={`${Boolean(currentStudent) ? "Edit" : "Add"} Student`}
      visible={isOpenStudentModal}
      onHide={() => setIsOpenStudentModal(false)}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      style={{ minWidth: "50vw" }}
    >
      <StudentForm handleToast={showToast} />
    </Dialog>
  );
}
