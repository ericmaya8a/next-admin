import { ToastMessage } from "primereact/toast";
import { useStudent } from "../student-context";
import { Dialog } from "primereact/dialog";
import { CONSTANTS } from "@/app/constatnts";
import { BuyGearForm } from "../forms/BuyGearForm";

type BuyGearModalProps = {
  showToast: (message: ToastMessage | ToastMessage[]) => void;
};

export function BuyGearModal({ showToast }: BuyGearModalProps) {
  //#region HOOKS
  const { currentStudent, isOpenBuyGearModal, onClose } = useStudent();
  //#endregion

  //#region JSX
  return (
    <Dialog
      header={`Gear for: ${currentStudent?.firstName} ${currentStudent?.lastName}`}
      visible={isOpenBuyGearModal}
      onHide={onClose}
      breakpoints={CONSTANTS.modal.breackpoints}
      style={{ width: "50vw" }}
    >
      <BuyGearForm showToast={showToast} />
    </Dialog>
  );
  //#endregion
}
