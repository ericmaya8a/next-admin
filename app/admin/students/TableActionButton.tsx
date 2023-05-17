import React, { useRef } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MappedStudent } from "./student-context";

type TableActionButtonProps = {
  row: MappedStudent;
  handleEdit: (data: MappedStudent) => void;
};

export function TableActionButton({ row, handleEdit }: TableActionButtonProps) {
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
                command: () => handleEdit(row),
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
