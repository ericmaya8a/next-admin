import { Dialog } from "primereact/dialog";
import { ToastMessage } from "primereact/toast";
import { CONSTANTS } from "@/app/constatnts";
import { useStudent } from "../student-context";
import { BuyUniformForm } from "../forms/BuyUniformForm";

type BuyUniformModalProps = {
  showToast: (message: ToastMessage | ToastMessage[]) => void;
};

export function BuyUniformModal({ showToast }: BuyUniformModalProps) {
  //#region HOOKS
  const { currentStudent, isOpenBuyUniformModal, onClose } = useStudent();
  //#endregion

  //#region JSX
  return (
    <Dialog
      header={`Uniform for: ${currentStudent?.firstName} ${currentStudent?.lastName}`}
      visible={isOpenBuyUniformModal}
      onHide={onClose}
      breakpoints={CONSTANTS.modal.breackpoints}
      style={{ width: "50vw" }}
    >
      <BuyUniformForm showToast={showToast} />
    </Dialog>
  );
  //#endregion
}
