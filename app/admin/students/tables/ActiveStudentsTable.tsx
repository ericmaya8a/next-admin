import { Rank } from "@prisma/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableFilterMeta,
} from "primereact/datatable";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FaCheckCircle } from "react-icons/fa";
import { useRole } from "@/app/hooks/useRole";
import { CONSTANTS } from "@/app/constatnts";
import { Belt } from "@/app/components/commons/Belt";
import { Header } from "@/app/components/commons/Header";
import { SearchTableHeader } from "@/app/components/commons/Table/SearchTableHeader";
import { MappedStudent } from "../student-context";
import { BirthdayHeader } from "./BirthdayHeader";
import { InscriptionHeader } from "./InscriptionHeader";
import { genderTemplate } from "./GenderTemplate";
import { RowExpansion } from "./RowExpansion";
import { TableActionButton } from "./TableActionButton";

type ActiveStudentsTableProps<T> = {
  students: T;
};

export function ActiveStudentsTable<T>({
  students,
}: ActiveStudentsTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows>();
  const [filters, setFilters] = useState<DataTableFilterMeta | null>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const { isAdmin, isSuperAdmin } = useRole();
  const hasUpdatePermission = isAdmin || isSuperAdmin;

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
    <Card
      title={
        <Header
          icon={<FaCheckCircle color="var(--green-500)" />}
          iconPosition="right"
        >
          Active Students
        </Header>
      }
      style={{ marginBottom: "2rem" }}
    >
      <DataTable
        // @ts-ignore
        value={students.filter((st: MappedStudent) => st.active)}
        header={
          <SearchTableHeader
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            handleClose={() => initFilters()}
          >
            <span></span>
          </SearchTableHeader>
        }
        // tableStyle={{ marginBottom: "2rem" }}
        removableSort
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data as DataTableExpandedRows)}
        dataKey="id"
        rowExpansionTemplate={RowExpansion}
        // @ts-ignore
        filters={filters}
        size="small"
      >
        <Column expander style={{ width: "1rem" }} />
        <Column
          field="name"
          header="Name"
          body={({ id, name }: MappedStudent) => (
            <Link href={`${CONSTANTS.urls.STUDENTS}/${id}`}>
              <Button label={name} text />
            </Link>
          )}
          sortable
        />
        <Column
          field="promotion"
          header="Rank"
          body={({ promotion }: MappedStudent) => (
            <Belt
              belt={
                promotion.length > 0
                  ? promotion[promotion.length - 1].rank
                  : Rank["BLANCA"]
              }
              tooltip
              tooltipPosition="right"
              width={70}
            />
          )}
        />
        <Column field="inscriptionDate" header={<InscriptionHeader />} />
        <Column field="gender" header="Gender" body={genderTemplate} sortable />
        <Column field="birthDate" header={<BirthdayHeader />} />
        {hasUpdatePermission ? (
          <Column
            field="name"
            body={(row: MappedStudent) => <TableActionButton row={row} />}
          />
        ) : null}
      </DataTable>
    </Card>
  );
}
