import { Gender, Rank } from "@prisma/client";
import { useState } from "react";
import styled from "styled-components";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { FormikForm } from "@/app/components/commons/Form/FormikForm";
import { FormikFormField } from "@/app/components/commons/Form/FormikFormField";
import { FormikSubmitButton } from "@/app/components/commons/Form/FormikSubmitButton";

type StudentFormT = {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  height?: string;
  weight?: string;
  active: boolean;
  inscriptionDate: string;
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
  birthDate: "",
  gender: "FEMALE",
  height: "",
  weight: "",
  active: true,
  inscriptionDate: "",
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
const options = Object.keys(Gender).map((g) => ({
  label: g.toLowerCase(),
  code: g,
}));

export function StudentForm({ onSubmit }: StudentFormProps) {
  const [date, setDate] = useState<string | Date | Date[] | null | undefined>(
    new Date()
  );
  const [gender, setGender] = useState(options[0]);
  console.log(gender);

  const handleSubmit = (values: StudentFormT) => {
    console.log(values);
    onSubmit();
  };

  return (
    <FormikForm<StudentFormT>
      initialValues={initialValues}
      validatiinSchema={{}}
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
        <Calendar
          value={date}
          onChange={(e: CalendarChangeEvent) => setDate(e.value)}
          dateFormat="dd/M/yy"
          showIcon
        />
        <Dropdown
          value={gender}
          onChange={(e: DropdownChangeEvent) => setGender(e.value)}
          options={options}
          optionLabel="label"
          placeholder="Select a Gender"
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
