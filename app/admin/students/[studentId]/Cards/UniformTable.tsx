import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { capitalizeEnum, formatNumberToCurrency } from "@/app/utils";
import { type UniformsT } from "./Uniforms";

type UniformTableProps = {
  data: UniformsT[];
};

export function UniformTable({ data }: UniformTableProps) {
  return (
    <DataTable value={data} size="small">
      <Column
        field="type"
        header="Type"
        body={({ type }: UniformsT) => capitalizeEnum(type)}
      />
      <Column
        field="brand"
        header="Brand"
        body={({ brand }: UniformsT) => capitalizeEnum(brand)}
      />
      <Column field="size" header="Size" />
      <Column
        field="price"
        header="Price"
        body={({ price }: UniformsT) => formatNumberToCurrency(price)}
      />
      <Column field="date" header="Date" />
    </DataTable>
  );
}
