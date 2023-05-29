import { PaymentType } from "@prisma/client";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { ToastMessage } from "primereact/toast";
import { CONSTANTS } from "../../constatnts";
import { useAdmin } from "../adminContext";
import { PaymentFormSchema } from "@/app/server/validationSchemas";
import { createOptionsFromEnum } from "@/app/clientUtils";
import { FormikForm } from "@/app/components/commons/Form/FormikForm";
import { FormikFormSelectField } from "@/app/components/commons/Form/FormikFormSelectField";
import { Row } from "@/app/components/commons/Row";
import { FormikFormInputNumberField } from "@/app/components/commons/Form/FormikFormInputNumberField";
import { FormikSubmitButton } from "@/app/components/commons/Form/FormikSubmitButton";
import { FormikFormCalendarField } from "@/app/components/commons/Form/FormikFormCalendarField";
import { ModalButtonWrapper } from "@/app/components/commons/ModalButtonWrapper";

type PaymentForm = {
  date: Date;
  paymentType: PaymentType;
  amount?: string;
};

type PaymentModalProps = {
  handleToast: (message: ToastMessage | ToastMessage[]) => void;
};

const initialValues: PaymentForm = {
  date: new Date(),
  paymentType: PaymentType["CASH"],
  amount: undefined,
};

export function PaymentModal({ handleToast }: PaymentModalProps) {
  //#region HOOKS
  const { isOpenPaymentModal, selectedStudent, createTuition, onClose } =
    useAdmin();
  const [loading, setLoading] = useState(false);
  //#endregion

  //#region LOGIC
  const handleSubmit = async ({ amount, date, paymentType }: PaymentForm) => {
    setLoading(true);
    const payment = {
      date,
      amount: parseFloat(amount!),
      paymentType,
      studentId: selectedStudent!.id,
    };
    const { ok } = await createTuition(payment);

    if (!ok) {
      setLoading(false);
      return handleToast({
        summary: "Error",
        detail: "Invalid Data",
        severity: "error",
      });
    }

    handleToast({
      summary: "Success",
      detail: "Tuition successfully paid",
      severity: "success",
    });
    setLoading(false);
    onClose();
  };
  //#endregion

  //#region JSX
  if (!selectedStudent) {
    return null;
  }

  return (
    <Dialog
      header={`Payment for: ${selectedStudent.name}`}
      visible={isOpenPaymentModal}
      onHide={onClose}
      breakpoints={CONSTANTS.modal.breackpoints}
      style={{ minWidth: "50vw" }}
    >
      <FormikForm<PaymentForm>
        initialValues={initialValues}
        validationSchema={PaymentFormSchema}
        onSubmit={handleSubmit}
      >
        <Row>
          <FormikFormCalendarField
            label="Date"
            id="data"
            name="date"
            width="100%"
          />
          <FormikFormSelectField
            label="Payment type"
            id="paymentType"
            name="paymentType"
            placeholder="Select type"
            options={createOptionsFromEnum(PaymentType)}
          />
        </Row>

        <Row>
          <FormikFormInputNumberField
            label="Amount"
            id="amount"
            name="amount"
            mode="currency"
            currency="USD"
            minFractionDigits={2}
            maxFractionDigits={2}
            width="50%"
          />
        </Row>

        <ModalButtonWrapper>
          <FormikSubmitButton type="submit" label="Pay" loading={loading} />
        </ModalButtonWrapper>
      </FormikForm>
    </Dialog>
  );
  //#endregion
}
