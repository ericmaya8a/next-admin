import { Gender } from "@prisma/client";
import styled from "styled-components";
import { FormikForm } from "@/app/components/commons/Form/FormikForm";
import { FormikFormField } from "@/app/components/commons/Form/FormikFormField";
import { FormikSubmitButton } from "@/app/components/commons/Form/FormikSubmitButton";
import { FormikFormCalendarField } from "@/app/components/commons/Form/FormikFormCalendarField";
import { StudentFormSchema } from "@/app/server/validationSchemas";
import { SelectItemOptionsType } from "primereact/selectitem";
import { FormikFormSelectField } from "@/app/components/commons/Form/FormikFormSelectField";

type StudentFormT = {
  firstName: string;
  lastName: string;
  birthDate?: Date;
  gender?: Gender;
  height?: string;
  weight?: string;
  active: boolean;
  inscriptionDate?: Date;
  address: {
    lineOne: string;
    lineTwo?: string;
    exteriorNumber: string;
    interiorNumber?: string;
    suburb: string;
    municipality: string;
    zipCode: string;
  };
  communication: {
    phone?: string;
    cellPhone: string;
    email: string;
  };
};

type StudentFormProps = {
  onSubmit: VoidFunction;
};

const initialValues: StudentFormT = {
  firstName: "",
  lastName: "",
  birthDate: new Date(),
  gender: undefined,
  height: "",
  weight: "",
  active: true,
  inscriptionDate: undefined,
  address: {
    lineOne: "",
    lineTwo: "",
    exteriorNumber: "",
    interiorNumber: "",
    suburb: "",
    municipality: "",
    zipCode: "",
  },
  communication: {
    phone: "",
    cellPhone: "",
    email: "",
  },
};
const options: SelectItemOptionsType = Object.keys(Gender).map((g) => ({
  label: g.toLowerCase(),
  value: g,
}));

export function StudentForm({ onSubmit }: StudentFormProps) {
  const handleSubmit = (values: StudentFormT) => {
    console.log(values);
    onSubmit();
  };

  return (
    <FormikForm<StudentFormT>
      initialValues={initialValues}
      validatiinSchema={StudentFormSchema}
      onSubmit={handleSubmit}
    >
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

      <FormikSubmitButton type="submit" label="Submit" />
    </FormikForm>
  );
}

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;

  div {
    width: 100%;
  }
`;
