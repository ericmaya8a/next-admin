import React, { useRef } from "react";
import { MdSportsMma } from "react-icons/md";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { StudentT } from "../page";
import { RowStudent, useStudent } from "../student-context";
import { Uniform } from "@/app/components/commons/Uniform";

type TableActionButtonProps = {
  row: StudentT[0];
};

const iconStyle: React.CSSProperties = { marginRight: "5px" };

export function TableActionButton({ row }: TableActionButtonProps) {
  const {
    setCurrentStudent,
    setIsOpenStudentModal,
    setIsOpenPromotionModal,
    setIsOpenBuyUniformModal,
    setIsOpenBuyGearModal,
  } = useStudent();
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

  const actionItems: MenuItem[] = [
    {
      label: "Edit",
      icon: PrimeIcons.USER_EDIT,
      command: () => {
        setCurrentStudent(studentRow);
        setIsOpenStudentModal(true);
      },
    },
  ];
  const storeItems: MenuItem[] = [];

  const menuModel: MenuItem[] = [
    {
      label: "Actions",
      items: actionItems,
    },
  ];

  if (row.active) {
    menuModel.push({
      label: "Store",
      items: storeItems,
    });

    actionItems.push({
      label: "Rank promotion",
      icon: <Uniform width={16} style={iconStyle} fill="var(--blue-500)" />,
      command: () => {
        setCurrentStudent(studentRow);
        setIsOpenPromotionModal(true);
      },
    });
    storeItems.push(
      {
        label: "Uniform",
        icon: <Uniform width={16} style={iconStyle} />,
        command: () => {
          setCurrentStudent(studentRow);
          setIsOpenBuyUniformModal(true);
        },
      },
      {
        label: "Gear",
        icon: (
          <MdSportsMma width={16} style={iconStyle} color="var(--red-700)" />
        ),
        command: () => {
          setCurrentStudent(studentRow);
          setIsOpenBuyGearModal(true);
        },
      }
    );
  }

  return (
    <>
      <Menu model={menuModel} popup ref={menu} />
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
