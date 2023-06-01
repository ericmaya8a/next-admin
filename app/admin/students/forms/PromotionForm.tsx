import { PaymentType, Rank } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastMessage } from "primereact/toast";
import { PromotionFormSchema } from "@/app/server/validationSchemas";
import {
  capitalizeEnum,
  createAvailableRanks,
  createOptionsFromEnum,
  handleInvalidClassName,
} from "@/app/utils";
import { ModalButtonWrapper } from "@/app/components/commons/ModalButtonWrapper";
import { Row } from "@/app/components/commons/Row";
import { PromotionT, useStudent } from "../student-context";
import { InputWrapper } from "@/app/components/commons/Input/InputWrapper";
import { Calendar } from "primereact/calendar";
import { CONSTANTS } from "@/app/constatnts";
import { FormikFieldError } from "@/app/components/commons/Form/FormikFieldError";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

type PromotionFormT = {
  date?: Date;
  rank?: Rank;
  price?: number;
  paymentType: PaymentType;
};

type PromotionFormProps = {
  handleToast: (message: ToastMessage | ToastMessage[]) => void;
};

export function PromotionForm({ handleToast }: PromotionFormProps) {
  //#region HOOKS
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<PromotionFormT>({
    defaultValues: {
      date: new Date(),
      rank: undefined,
      price: undefined,
      paymentType: PaymentType["CASH"],
    },
    resolver: yupResolver(PromotionFormSchema),
  });
  const { currentStudent, createPromotion, onClose } = useStudent();
  //#endregion

  //#region LOGIC
  const onSubmit = async ({
    date,
    rank,
    price,
    paymentType,
  }: PromotionFormT) => {
    const promotion: PromotionT = {
      date: date!,
      rank: rank!,
      studentId: currentStudent!.id,
      price: price!,
      paymentType,
    };

    const { ok } = await createPromotion(promotion);

    if (!ok) {
      return handleToast({
        summary: "Error",
        detail: "Invalid Data",
        severity: "error",
      });
    }

    handleToast({
      summary: "Success",
      detail: `Rank: ${capitalizeEnum(rank!)} sucessfully asigned to: ${
        currentStudent?.firstName
      } ${currentStudent?.lastName}`,
      severity: "success",
    });
    onClose();
  };
  //#endregion

  //#region JSX
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Row>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Date" id={field.name}>
              <Calendar
                {...field}
                className={handleInvalidClassName(errors.date?.message)}
                id={field.name}
                dateFormat={CONSTANTS.date.calendarFormat}
                showIcon
                showButtonBar
              />
              <FormikFieldError error={errors.date?.message} />
            </InputWrapper>
          )}
        />
        <Controller
          name="rank"
          control={control}
          render={({ field }) => (
            <InputWrapper label="New Rank" id={field.name}>
              <Dropdown
                {...field}
                id={field.name}
                className={handleInvalidClassName(errors.rank?.message)}
                options={createAvailableRanks(currentStudent?.promotion)}
                placeholder="Select a Rank"
              />
              <FormikFieldError error={errors.rank?.message} />
            </InputWrapper>
          )}
        />
      </Row>

      <Row>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Price" id="price">
              <InputNumber
                id={field.name}
                inputRef={field.ref}
                value={field.value}
                onBlur={field.onBlur}
                onValueChange={(e) => field.onChange(e)}
                className={handleInvalidClassName(errors.price?.message)}
                mode="currency"
                currency="USD"
                maxFractionDigits={2}
              />
              <FormikFieldError error={errors.price?.message} />
            </InputWrapper>
          )}
        />
        <Controller
          name="paymentType"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Payment Type" id={field.name}>
              <Dropdown
                {...field}
                id={field.name}
                className={handleInvalidClassName(errors.paymentType?.message)}
                placeholder="Select option"
                options={createOptionsFromEnum(PaymentType)}
              />
              <FormikFieldError error={errors.paymentType?.message} />
            </InputWrapper>
          )}
        />
      </Row>

      <ModalButtonWrapper>
        <Button type="submit" label="Add" loading={isSubmitting} />
      </ModalButtonWrapper>
    </form>
  );
  //#endregion
}
