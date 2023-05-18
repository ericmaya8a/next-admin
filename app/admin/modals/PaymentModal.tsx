import { Dialog } from "primereact/dialog";
import { CONSTANTS } from "../../constatnts";
import { NextPaymentsT } from "../Admin";
import { PaymentType } from "@prisma/client";
import { PaymentFormSchema } from "@/app/server/validationSchemas";
import { createOptionsFromEnum } from "@/app/clientUtils";
import { FormikForm } from "@/app/components/commons/Form/FormikForm";
import { FormikFormSelectField } from "@/app/components/commons/Form/FormikFormSelectField";
import { Row } from "@/app/components/commons/Row";
import { FormikFormInputNumberField } from "@/app/components/commons/Form/FormikFormInputNumberField";
import { FormikSubmitButton } from "@/app/components/commons/Form/FormikSubmitButton";
import { ModalButtonWrapper } from "@/app/components/commons/ModalButtonWrapper";

type PaymentModalProps = {
  isOpen: boolean;
  student?: NextPaymentsT["data"][0];
  onHide: VoidFunction;
  onPayment: VoidFunction;
};

type PaymentForm = {
  paymentType: PaymentType;
  amount: string;
};

const initialValues: PaymentForm = {
  paymentType: PaymentType["CASH"],
  amount: "",
};

export function PaymentModal({
  isOpen,
  student,
  onHide,
  onPayment,
}: PaymentModalProps) {
  const handleSubmit = (values: PaymentForm) => {
    console.log(values);
  };

  if (!student) {
    return null;
  }

  return (
    <Dialog
      header={`Payment for: ${student.name}`}
      visible={isOpen}
      onHide={onHide}
      breakpoints={CONSTANTS.modal.breackpoints}
      style={{ minWidth: "50vw" }}
    >
      <FormikForm<PaymentForm>
        initialValues={initialValues}
        validationSchema={PaymentFormSchema}
        onSubmit={handleSubmit}
      >
        <Row>
          <FormikFormSelectField
            label="Payment type"
            id="paymentType"
            name="paymentType"
            placeholder="Select type"
            options={createOptionsFromEnum(PaymentType)}
          />
          <FormikFormInputNumberField
            label="Amount"
            id="amount"
            name="amount"
            minFractionDigits={2}
            maxFractionDigits={2}
            width="100%"
          />
        </Row>

        <ModalButtonWrapper>
          <FormikSubmitButton type="submit" label="Pay" />
        </ModalButtonWrapper>
      </FormikForm>
    </Dialog>
  );
}
