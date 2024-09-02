import { GridColDef } from "@mui/x-data-grid";

export const colors = ["#00c49f", "#0088fe", "FFB828"];
export const invColumns: GridColDef[] = [
  {
    field: "productId",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: 'Stock Quantity',
    width: 150,
    type:"number"
  }
];
export const userColumns:GridColDef[] = [
  {
    field: "userId",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200
  }
 


]
export const labelCSS = "block font-medium text-sm text-gray-700"
export const inputCSS =
  "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";
  export const classNames = {
    label: "block text-sm font-medium text-gray-700",
    selectedInput:
      "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 foce:border-indigo-500 sm:text-sm rounded-md",
  };