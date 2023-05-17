import { Dialog } from "primereact/dialog";
import { ToastMessage } from "primereact/toast";
import { CONSTANTS } from "@/app/constatnts";

type PromotionModalProps = {
  showToast: (message: ToastMessage | ToastMessage[]) => void;
};

export function PromotionModal({ showToast }: PromotionModalProps) {
  return (
    <Dialog
      visible={false}
      onHide={() => {}}
      breakpoints={CONSTANTS.modal.breackpoints}
    ></Dialog>
  );
}
