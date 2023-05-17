import React, { useRef } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MappedStudent, RowStudent, useStudent } from "./student-context";

type TableActionButtonProps = {
  row: MappedStudent;
  handleEdit: VoidFunction;
};

export function TableActionButton({ row, handleEdit }: TableActionButtonProps) {
  const { setCurrentStudent } = useStudent();
  const menu = useRef<Menu>(null);

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
                  };
                  setCurrentStudent(studentRow);
                  handleEdit();
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
