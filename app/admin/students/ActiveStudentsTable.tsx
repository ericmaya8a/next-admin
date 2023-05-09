import { Student } from "@prisma/client";
import { useEffect, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableFilterMeta,
} from "primereact/datatable";
import { FaCheckCircle } from "react-icons/fa";
import { TfiRuler } from "react-icons/tfi";
import { GiWeight } from "react-icons/gi";
import { MapStudentsT, mapStudents } from "@/app/clientUtils";
import { Header } from "@/app/components/commons/Header";
import { SearchTableHeader } from "@/app/components/commons/Table/SearchTableHeader";
import { BirthdayHeader } from "./BirthdayHeader";
import { InscriptionHeader } from "./InscriptionHeader";
import { genderTemplate } from "./GenderTemplate";

type ActiveStudentsTableProps = {
  students: Student[];
};

export function ActiveStudentsTable({ students }: ActiveStudentsTableProps) {
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows>();
  const [filters, setFilters] = useState<DataTableFilterMeta | null>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const mapedStudents: MapStudentsT = mapStudents(students).filter(
    ({ active }) => active
  );

  const rowExpansionTemplate = ({
    height,
    weight,
  }: (typeof mapedStudents)[0]) => (
    <>
      <Header icon={<TfiRuler />}>{height} m.</Header>
      <Header icon={<GiWeight />}>{weight} kg.</Header>
    </>
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
          <Header
            icon={<FaCheckCircle color="var(--green-500)" />}
            iconPosition="right"
          >
            Active
          </Header>
        </SearchTableHeader>
      }
      tableStyle={{ marginBottom: "2rem" }}
      removableSort
      expandedRows={expandedRows}
      onRowToggle={(e) => setExpandedRows(e.data as DataTableExpandedRows)}
      dataKey="id"
      rowExpansionTemplate={rowExpansionTemplate}
      // @ts-ignore
      filters={filters}
    >
      <Column expander style={{ width: "1rem" }} />
      <Column field="name" header="Name" sortable />
      <Column field="inscriptionDate" header={<InscriptionHeader />} sortable />
      <Column field="gender" header="Gender" body={genderTemplate} sortable />
      <Column field="birthDate" header={<BirthdayHeader />} sortable />
    </DataTable>
  );
}
