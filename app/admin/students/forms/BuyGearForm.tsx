import { PaymentType } from "@prisma/client";
import { useState } from "react";
import { ToastMessage } from "primereact/toast";
import { BuyGearSchema } from "@/app/server/validationSchemas";
import { createOptionsFromEnum } from "@/app/clientUtils";
import { FormikForm } from "@/app/components/commons/Form/FormikForm";
import { FormikFormField } from "@/app/components/commons/Form/FormikFormField";
import { FormikFormInputNumberField } from "@/app/components/commons/Form/FormikFormInputNumberField";
import { FormikFormSelectField } from "@/app/components/commons/Form/FormikFormSelectField";
import { FormikSubmitButton } from "@/app/components/commons/Form/FormikSubmitButton";
import { ModalButtonWrapper } from "@/app/components/commons/ModalButtonWrapper";
import { Row } from "@/app/components/commons/Row";
import { GearT, useStudent } from "../student-context";

type BuyGearFormT = {
  description: string;
  price?: number;
  paymentType: PaymentType;
  amount?: number;
};

type BuyGearFormProps = {
  showToast: (message: ToastMessage | ToastMessage[]) => void;
};

const initialValues: BuyGearFormT = {
  description: "",
  price: undefined,
  paymentType: PaymentType["CASH"],
  amount: undefined,
};

export function BuyGearForm({ showToast }: BuyGearFormProps) {
  //#region HOOKS
  const [loading, setLoading] = useState(false);
  const { currentStudent, createGear, onClose } = useStudent();
  //#endregion

  //#region LOGIC
  const handleSubmit = async ({
    description,
    price,
    paymentType,
    amount,
  }: BuyGearFormT) => {
    setLoading(true);
    const newGear: GearT = {
      description,
      price: price!,
      studentId: currentStudent!.id,
      paymentType,
    };

    const gearItems: any[] = [];
    Array.from(Array(amount).keys()).forEach(() =>
      gearItems.push(createGear(newGear))
    );

    try {
      const values = await Promise.all(gearItems);

      if (values.some((item) => !item.ok)) {
        setLoading(false);
        return showToast({
          summary: "Error",
          detail: "Invalid Data",
          severity: "error",
        });
      }

      showToast({
        summary: "Success",
        detail: `Gear for ${currentStudent?.firstName} ${currentStudent?.lastName} successfully created`,
        severity: "success",
      });
      setLoading(false);
      onClose();
    } catch (error) {}
  };
  //#endregion

  //#region JSX
  return (
    <FormikForm<BuyGearFormT>
      initialValues={initialValues}
      validationSchema={BuyGearSchema}
      onSubmit={handleSubmit}
    >
      <FormikFormField
        label="Description"
        id="description"
        name="description"
        width="100%"
      />
      <Row>
        <FormikFormInputNumberField
          label="Price"
          id="price"
          name="price"
          mode="currency"
          currency="USD"
          maxFractionDigits={2}
        />
        <FormikFormInputNumberField label="Amount" id="amount" name="amount" />
      </Row>
      <FormikFormSelectField
        label="Payment type"
        id="paymentType"
        name="paymentType"
        placeholder="Select type"
        options={createOptionsFromEnum(PaymentType)}
        width="50%"
      />

      <ModalButtonWrapper>
        <FormikSubmitButton type="submit" label="Buy" loading={loading} />
      </ModalButtonWrapper>
    </FormikForm>
  );
  //#endregion
}
