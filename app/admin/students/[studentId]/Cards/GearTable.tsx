import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { formatNumberToCurrency } from "@/app/utils";
import { GearsT } from "./Gear";

type GearTableProps = {
  data: GearsT[];
};

export function GearTable({ data }: GearTableProps) {
  return (
    <DataTable value={data} size="small">
      <Column field="description" header="Description" />
      <Column
        field="price"
        header="Price"
        body={({ price }: GearsT) => formatNumberToCurrency(price)}
      />
      <Column field="date" header="Date" />
    </DataTable>
  );
}
