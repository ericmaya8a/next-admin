import { Rank } from "@prisma/client";
import { useEffect, useState } from "react";
import { ToastMessage } from "primereact/toast";
import { PromotionFormSchema } from "@/app/server/validationSchemas";
import { capitalizeEnum, createAvailableRanks } from "@/app/clientUtils";
import { FormikForm } from "@/app/components/commons/Form/FormikForm";
import { FormikFormCalendarField } from "@/app/components/commons/Form/FormikFormCalendarField";
import { FormikFormSelectField } from "@/app/components/commons/Form/FormikFormSelectField";
import { FormikSubmitButton } from "@/app/components/commons/Form/FormikSubmitButton";
import { ModalButtonWrapper } from "@/app/components/commons/ModalButtonWrapper";
import { Row } from "@/app/components/commons/Row";
import { PromotionT, useStudent } from "../student-context";

type PromotionFormT = {
  date?: Date;
  rank?: Rank;
};

type PromotionFormProps = {
  handleToast: (message: ToastMessage | ToastMessage[]) => void;
};

export function PromotionForm({ handleToast }: PromotionFormProps) {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<PromotionFormT>({
    date: undefined,
    rank: undefined,
  });
  const { currentStudent, createPromotion, onClose } = useStudent();

  useEffect(() => {
    setInitialValues({
      date: new Date(),
      rank: undefined,
    });
  }, []);

  const handleSubmit = async ({ date, rank }: PromotionFormT) => {
    const promotion: PromotionT = {
      date: date!,
      rank: rank!,
      studentId: currentStudent!.id,
    };

    setLoading(true);
    const { ok } = await createPromotion(promotion);

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
      detail: `Rank: ${capitalizeEnum(rank!)} suucessfully asigned to: ${
        currentStudent?.firstName
      } ${currentStudent?.lastName}`,
      severity: "success",
    });
    setLoading(false);
    onClose();
  };

  return (
    <FormikForm<PromotionFormT>
      initialValues={initialValues}
      validationSchema={PromotionFormSchema}
      onSubmit={handleSubmit}
    >
      <Row>
        <FormikFormCalendarField
          label="Date"
          id="date"
          name="date"
          width="100%"
        />
        <FormikFormSelectField
          label="New Rank"
          id="rank"
          name="rank"
          placeholder="Select a Rank"
          options={createAvailableRanks(currentStudent?.promotion)}
        />
      </Row>

      <ModalButtonWrapper>
        <FormikSubmitButton type="submit" label="Add" loading={loading} />
      </ModalButtonWrapper>
    </FormikForm>
  );
}
