import { Dialog } from "primereact/dialog";
import { ToastMessage } from "primereact/toast";
import { CONSTANTS } from "@/app/constatnts";
import { PromotionForm } from "../forms/PromotionForm";
import { useStudent } from "../student-context";

type PromotionModalProps = {
  showToast: (message: ToastMessage | ToastMessage[]) => void;
};

export function PromotionModal({ showToast }: PromotionModalProps) {
  const {
    currentStudent,
    isOpenPromotionModal,
    setIsOpenPromotionModal,
    setCurrentStudent,
  } = useStudent();

  return (
    <Dialog
      header={`${currentStudent?.firstName} ${currentStudent?.lastName}'s promotion`}
      visible={isOpenPromotionModal}
      onHide={() => {
        setIsOpenPromotionModal(false);
        setCurrentStudent(undefined);
      }}
      breakpoints={CONSTANTS.modal.breackpoints}
      style={{ width: "50vw" }}
    >
      <PromotionForm handleToast={showToast} />
    </Dialog>
  );
}
