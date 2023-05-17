import React, { useRef } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MappedStudent, RowStudent, useStudent } from "../student-context";
import { Uniform } from "@/app/components/commons/Uniform";

type TableActionButtonProps = {
  row: MappedStudent;
};

export function TableActionButton({ row }: TableActionButtonProps) {
  const { setCurrentStudent, setIsOpenStudentModal, setIsOpenPromotionModal } =
    useStudent();
  const menu = useRef<Menu>(null);

  const studentRow: RowStudent = {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    birthDate: new Date(row.birthDate),
    gender: row.gender,
    height: row.height,
    weight: row.weight,
    inscriptionDate: new Date(row.inscriptionDate),
    active: row.active,
    communication: row.communication!,
    address: row.address!,
    promotion: row.promotion,
  };

  return (
    <>
      <Menu
        model={[
          {
            label: "Actions",
            items: [
              {
                label: "Edit",
                icon: PrimeIcons.USER_EDIT,
                command: () => {
                  setCurrentStudent(studentRow);
                  setIsOpenStudentModal(true);
                },
              },
              {
                label: "Add promotion",
                icon: <Uniform width={16} style={{ marginRight: "5px" }} />,
                command: () => {
                  setCurrentStudent(studentRow);
                  setIsOpenPromotionModal(true);
                },
              },
            ],
          },
        ]}
        popup
        ref={menu}
      />
      <Button
        icon={PrimeIcons.ELLIPSIS_V}
        aria-label="Actions"
        rounded
        text
        onClick={(e) => menu.current?.toggle(e)}
        severity="secondary"
      />
    </>
  );
}
