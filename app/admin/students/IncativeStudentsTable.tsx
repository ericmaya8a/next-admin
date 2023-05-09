import { Student } from "@prisma/client";
import { useEffect, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { FaBan } from "react-icons/fa";
import { MapStudentsT, mapStudents } from "@/app/clientUtils";
import { Header } from "@/app/components/commons/Header";
import { SearchTableHeader } from "@/app/components/commons/Table/SearchTableHeader";
import { BirthdayHeader } from "./BirthdayHeader";
import { InscriptionHeader } from "./InscriptionHeader";
import { genderTemplate } from "./GenderTemplate";

type IncativeStudentsTableProps = {
  students: Student[];
};

export function IncativeStudentsTable({
  students,
}: IncativeStudentsTableProps) {
  const [filters, setFilters] = useState<DataTableFilterMeta | null>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const mapedStudents: MapStudentsT = mapStudents(students).filter(
    ({ active }) => !active
  );

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue("");
  };

  const onGlobalFilterChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    let _filters = { ...filters };

    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  useEffect(() => {
    initFilters();
  }, []);

  return (
    <DataTable
      value={mapedStudents}
      header={
        <SearchTableHeader
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          handleClose={() => initFilters()}
        >
          <Header icon={<FaBan color="var(--red-700)" />} iconPosition="right">
            Incative
          </Header>
        </SearchTableHeader>
      }
      removableSort
      // @ts-ignore
      filters={filters}
    >
      <Column field="name" header="Name" sortable />
      <Column field="inscriptionDate" header={<InscriptionHeader />} sortable />
      <Column field="gender" header="Gender" body={genderTemplate} sortable />
      <Column field="birthDate" header={<BirthdayHeader />} sortable />
    </DataTable>
  );
}
