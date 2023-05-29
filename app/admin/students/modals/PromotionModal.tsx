import { Dialog } from "primereact/dialog";
import { ToastMessage } from "primereact/toast";
import { CONSTANTS } from "@/app/constatnts";
import { PromotionForm } from "../forms/PromotionForm";
import { useStudent } from "../student-context";

type PromotionModalProps = {
  showToast: (message: ToastMessage | ToastMessage[]) => void;
};

export function PromotionModal({ showToast }: PromotionModalProps) {
  //#region HOOKS
  const { currentStudent, isOpenPromotionModal, onClose } = useStudent();
  //#endregion

  //#region JSX
  return (
    <Dialog
      header={`${currentStudent?.firstName} ${currentStudent?.lastName}'s promotion`}
      visible={isOpenPromotionModal}
      onHide={onClose}
      breakpoints={CONSTANTS.modal.breackpoints}
      style={{ width: "50vw" }}
    >
      {isOpenPromotionModal ? <PromotionForm handleToast={showToast} /> : null}
    </Dialog>
  );
  //#endregion
}
