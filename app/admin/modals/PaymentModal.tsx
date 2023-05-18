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
import { FormikFormCalendarField } from "@/app/components/commons/Form/FormikFormCalendarField";
import { ModalButtonWrapper } from "@/app/components/commons/ModalButtonWrapper";

type PaymentModalProps = {
  isOpen: boolean;
  student?: NextPaymentsT["data"][0];
  onHide: VoidFunction;
  onPayment: VoidFunction;
};

type PaymentForm = {
  date: Date;
  paymentType: PaymentType;
  amount: string;
};

const initialValues: PaymentForm = {
  date: new Date(),
  paymentType: PaymentType["CASH"],
  amount: "",
};

export function PaymentModal({
  isOpen,
  student,
  onHide,
  onPayment,
}: PaymentModalProps) {
  const handleSubmit = ({ amount, date, paymentType }: PaymentForm) => {
    const payment = {
      date,
      amount,
      paymentType,
      studentId: student?.id,
    };
    console.log(payment);
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
          <FormikSubmitButton type="submit" label="Pay" />
        </ModalButtonWrapper>
      </FormikForm>
    </Dialog>
  );
}
