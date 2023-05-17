import { Dialog } from "primereact/dialog";
import { ToastMessage } from "primereact/toast";
import { CONSTANTS } from "@/app/constatnts";
import { useStudent } from "../student-context";
import { StudentForm } from "../forms/StudentForm";

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
      breakpoints={CONSTANTS.modal.breackpoints}
      style={{ minWidth: "50vw" }}
    >
      <StudentForm handleToast={showToast} />
    </Dialog>
  );
}
