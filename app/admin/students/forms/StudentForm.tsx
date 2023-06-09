import { Gender } from "@prisma/client";
import { useState } from "react";
import { TfiRuler } from "react-icons/tfi";
import { GiWeight } from "react-icons/gi";
import { Message } from "primereact/message";
import { ToastMessage } from "primereact/toast";
import { createOptionsFromEnum } from "@/app/utils";
import { CONSTANTS } from "@/app/constatnts";
import { FormikForm } from "@/app/components/commons/Form/FormikForm";
import { FormikFormField } from "@/app/components/commons/Form/FormikFormField";
import { FormikSubmitButton } from "@/app/components/commons/Form/FormikSubmitButton";
import { FormikFormCalendarField } from "@/app/components/commons/Form/FormikFormCalendarField";
import { StudentFormSchema } from "@/app/server/validationSchemas";
import { FormikFormSelectField } from "@/app/components/commons/Form/FormikFormSelectField";
import { FormikFormInputNumberField } from "@/app/components/commons/Form/FormikFormInputNumberField";
import { FormikFormInputMask } from "@/app/components/commons/Form/FormikFormInputMask";
import { FormikFormInputSwitch } from "@/app/components/commons/Form/FormikFormInputSwitch";
import { ModalButtonWrapper } from "@/app/components/commons/ModalButtonWrapper";
import { Row } from "@/app/components/commons/Row";
import { CreateStudentT, EditStudentT, useStudent } from "../student-context";

type StudentFormT = {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate?: Date;
  gender?: Gender;
  height?: string;
  weight?: string;
  active: boolean;
  inscriptionDate?: Date;
  lineOne: string;
  lineTwo?: string;
  exteriorNumber: string;
  interiorNumber?: string;
  suburb: string;
  municipality: string;
  zipCode: string;
  phone?: string;
  cellPhone: string;
  email: string;
};

type StudentFormProps = {
  handleToast: (message: ToastMessage | ToastMessage[]) => void;
};

const initialValues: StudentFormT = {
  firstName: "",
  lastName: "",
  birthDate: undefined,
  gender: undefined,
  height: "",
  weight: "",
  active: true,
  inscriptionDate: new Date(),
  lineOne: "",
  lineTwo: "",
  exteriorNumber: "",
  interiorNumber: "",
  suburb: "",
  municipality: "",
  zipCode: "",
  phone: "",
  cellPhone: "",
  email: "",
};
const options = createOptionsFromEnum(Gender);

export function StudentForm({ handleToast }: StudentFormProps) {
  //#region HOOKS
  const { currentStudent, createStudent, editStudent, onClose } = useStudent();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(false);
  //#endregion

  //#region LOGIC
  const isEditMode = Boolean(currentStudent);

  const errorMessage = message ? (
    <Message
      text={message}
      severity="error"
      style={{ marginBottom: "1rem", display: "block" }}
    />
  ) : null;

  const handleSubmit = async ({
    id,
    active,
    firstName,
    lastName,
    birthDate,
    gender,
    height,
    weight,
    inscriptionDate,
    email,
    cellPhone,
    phone,
    lineOne,
    lineTwo,
    exteriorNumber,
    interiorNumber,
    suburb,
    municipality,
    zipCode,
  }: StudentFormT) => {
    const newStudent: CreateStudentT = {
      active,
      firstName,
      lastName,
      birthDate: birthDate as Date,
      gender: gender as Gender,
      height: height ? Number(height) : null,
      weight: weight ? Number(weight) : null,
      inscriptionDate: inscriptionDate as Date,
      lineOne,
      lineTwo: lineTwo ?? null,
      exteriorNumber,
      interiorNumber: interiorNumber ?? null,
      suburb,
      municipality,
      zipCode,
      phone: phone ?? null,
      cellPhone,
      email: email.toLowerCase(),
    };

    setLoading(true);

    if (isEditMode) {
      const editedStudent: EditStudentT = {
        id: id as string,
        ...newStudent,
      };
      const { ok } = await editStudent(editedStudent);
      setLoading(false);

      if (!ok) {
        return setMessage("Invalida data");
      }
    } else {
      const { ok } = await createStudent(newStudent);
      setLoading(false);

      if (!ok) {
        return setMessage(`Student with email: ${email} already exists`);
      }
    }

    handleToast({
      severity: "success",
      summary: "Success",
      detail: `Student "${firstName} ${lastName}" was successfully ${
        isEditMode ? "updated" : "created"
      }!`,
    });
    onClose();
  };
  //#endregion

  //#region JSX
  return (
    <FormikForm<StudentFormT>
      initialValues={
        isEditMode
          ? {
              id: currentStudent?.id,
              firstName: currentStudent!.firstName,
              lastName: currentStudent!.lastName,
              birthDate: new Date(currentStudent!.birthDate),
              gender: currentStudent?.gender,
              height: currentStudent?.height
                ? String(currentStudent.height)
                : undefined,
              weight: currentStudent?.weight
                ? String(currentStudent.weight)
                : undefined,
              inscriptionDate: new Date(currentStudent!.inscriptionDate),
              lineOne: currentStudent!.address.lineOne,
              lineTwo: currentStudent?.address.lineTwo as string | undefined,
              exteriorNumber: currentStudent!.address.exteriorNumber,
              interiorNumber: currentStudent?.address.interiorNumber as
                | string
                | undefined,
              suburb: currentStudent!.address.suburb,
              municipality: currentStudent!.address.municipality,
              zipCode: currentStudent!.address.zipCode,
              phone: currentStudent?.communication.phone as string | undefined,
              cellPhone: currentStudent?.communication.cellPhone as string,
              email: currentStudent!.communication.email,
              active: currentStudent!.active,
            }
          : initialValues
      }
      validationSchema={StudentFormSchema}
      onSubmit={handleSubmit}
    >
      {errorMessage}
      <Row>
        <FormikFormField
          label="First Name"
          id="firstName"
          name="firstName"
          width="100%"
        />
        <FormikFormField
          label="Last Name"
          id="lastName"
          name="lastName"
          width="100%"
        />
      </Row>

      <Row>
        <FormikFormCalendarField
          label="Birth Date"
          id="birthDate"
          name="birthDate"
          width="100%"
        />
        <FormikFormSelectField
          label="Gender"
          id="gender"
          name="gender"
          options={options}
          placeholder="Select gender"
        />
      </Row>

      <Row>
        <FormikFormInputNumberField
          label="Height (m)"
          id="height"
          name="height"
          mode="decimal"
          maxFractionDigits={2}
          rightIcon={<TfiRuler />}
          width="100%"
        />
        <FormikFormInputNumberField
          label="Weight (kg)"
          id="weight"
          name="weight"
          mode="decimal"
          maxFractionDigits={1}
          rightIcon={<GiWeight />}
          width="100%"
        />
      </Row>

      <Row>
        <FormikFormCalendarField
          label="Inscription Date"
          id="inscriptionDate"
          name="inscriptionDate"
          width="100%"
        />
        <FormikFormField
          label="Email"
          id="email"
          name="email"
          type="email"
          onChange={() => setMessage(undefined)}
          width="100%"
        />
      </Row>

      <Row>
        <FormikFormInputMask
          label="Cell Phone"
          id="cellPhone"
          name="cellPhone"
          mask={CONSTANTS.inputMask.phone}
          placeholder={CONSTANTS.inputMask.phone}
          width="100%"
        />
        <FormikFormInputMask
          label="Phone"
          id="phone"
          name="phone"
          mask={CONSTANTS.inputMask.phone}
          placeholder={CONSTANTS.inputMask.phone}
          width="100%"
        />
      </Row>

      <Row>
        <FormikFormField
          label="Street"
          id="lineOne"
          name="lineOne"
          width="100%"
        />
        <FormikFormField
          label="Street 2"
          id="lineTwo"
          name="lineTwo"
          helper="Continue street (if neccesary)"
          width="100%"
        />
      </Row>

      <Row>
        <FormikFormField
          label="Exterior Number"
          id="exteriorNumber"
          name="exteriorNumber"
          width="100%"
        />
        <FormikFormField
          label="Interior Number"
          id="interiorNumber"
          name="interiorNumber"
          width="100%"
        />
      </Row>

      <Row>
        <FormikFormField
          label="Suburb"
          id="suburb"
          name="suburb"
          width="100%"
        />
        <FormikFormField
          label="Municipality"
          id="municipality"
          name="municipality"
          width="100%"
        />
      </Row>

      <Row>
        <FormikFormField label="Zip code" id="zipCode" name="zipCode" />
        {isEditMode ? (
          <FormikFormInputSwitch
            label="Active Student"
            id="active"
            name="active"
          />
        ) : null}
      </Row>

      {errorMessage}
      <ModalButtonWrapper>
        <FormikSubmitButton type="submit" label="Submit" loading={loading} />
      </ModalButtonWrapper>
    </FormikForm>
  );
  //#endregion
}
