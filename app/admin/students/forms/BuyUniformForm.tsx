import { PaymentType, UniformBrand, UniformType } from "@prisma/client";
import { useState } from "react";
import { ToastMessage } from "primereact/toast";
import { BuyUniformSchema } from "@/app/server/validationSchemas";
import { FormikForm } from "@/app/components/commons/Form/FormikForm";
import { Row } from "@/app/components/commons/Row";
import { FormikFormSelectField } from "@/app/components/commons/Form/FormikFormSelectField";
import { createOptionsFromEnum } from "@/app/clientUtils";
import { FormikFormField } from "@/app/components/commons/Form/FormikFormField";
import { FormikFormInputNumberField } from "@/app/components/commons/Form/FormikFormInputNumberField";
import { ModalButtonWrapper } from "@/app/components/commons/ModalButtonWrapper";
import { FormikSubmitButton } from "@/app/components/commons/Form/FormikSubmitButton";
import { UniformT, useStudent } from "../student-context";

type BuyUniformFormT = {
  type?: UniformType;
  brand?: UniformBrand;
  paymentType: PaymentType;
  size: string;
  price?: number;
  amount: number;
};

type BuyUniformFormProps = {
  showToast: (message: ToastMessage | ToastMessage[]) => void;
};

const initialValues: BuyUniformFormT = {
  type: UniformType["KARATEGI"],
  brand: UniformBrand["ASIANA"],
  paymentType: PaymentType["CASH"],
  size: "",
  price: undefined,
  amount: 1,
};

export function BuyUniformForm({ showToast }: BuyUniformFormProps) {
  //#region HOOKS
  const [loading, setLoading] = useState(false);
  const { currentStudent, createUniform, onClose } = useStudent();
  //#endregion

  //#region LOGIC
  const handleSubmit = async ({
    type,
    brand,
    size,
    price,
    amount,
    paymentType,
  }: BuyUniformFormT) => {
    setLoading(true);
    const uniform: UniformT = {
      type: type!,
      brand: brand!,
      size,
      price: price!,
      studentId: currentStudent!.id,
      paymentType,
    };
    const uniforms: any[] = [];
    Array.from(Array(amount).keys()).forEach(() =>
      uniforms.push(createUniform(uniform))
    );

    try {
      const values = await Promise.all(uniforms);
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
        detail: `Uniform${amount > 1 ? "s" : ""} for ${
          currentStudent?.firstName
        } ${currentStudent?.lastName} successfully created`,
        severity: "success",
      });
      setLoading(false);
      onClose();
    } catch (error) {
      showToast({
        summary: "Error",
        detail: "Invalid Data",
        severity: "error",
      });
      setLoading(false);
    }
  };
  //#endregion

  //#region JSX
  return (
    <FormikForm<BuyUniformFormT>
      initialValues={initialValues}
      validationSchema={BuyUniformSchema}
      onSubmit={handleSubmit}
    >
      <Row>
        <FormikFormSelectField
          label="Type"
          id="type"
          name="type"
          placeholder="Select type"
          options={createOptionsFromEnum(UniformType)}
          filter
        />
        <FormikFormSelectField
          label="Brand"
          id="brand"
          name="brand"
          placeholder="Select brand"
          options={createOptionsFromEnum(UniformBrand)}
        />
      </Row>

      <Row>
        <FormikFormField label="Size" id="size" name="size" />
        <FormikFormInputNumberField label="Amount" id="amount" name="amount" />
      </Row>

      <Row>
        <FormikFormInputNumberField
          label="Price"
          id="price"
          name="price"
          mode="currency"
          currency="USD"
          maxFractionDigits={2}
        />
        <FormikFormSelectField
          label="Payment type"
          id="paymentType"
          name="paymentType"
          placeholder="Select type"
          options={createOptionsFromEnum(PaymentType)}
        />
      </Row>

      <ModalButtonWrapper>
        <FormikSubmitButton type="submit" label="Buy" loading={loading} />
      </ModalButtonWrapper>
    </FormikForm>
  );
  //#endregion
}
